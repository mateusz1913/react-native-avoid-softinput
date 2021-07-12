package com.reactnativeavoidsoftinput

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowManager
import android.widget.ScrollView
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.PixelUtil

class AvoidSoftInputModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, AvoidSoftInputProvider.SoftInputListener {
  private var mIsInitialized = false
  private var mIsEnabled = false
  private var mAvoidSoftInputProvider: AvoidSoftInputProvider? = null
  private var mCurrentFocusedView: View? = null
  private var mPreviousFocusedView: View? = null
  private var mScrollViewParent: ScrollView? = null
  private var mIsRootViewSlideUp = false
  private var mDefaultSoftInputMode: Int = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED
  private var mCurrentBottomPadding: Int = 0
  private var mBottomOffset: Float = 0F
  private var mAvoidOffset: Float = 0F

  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView
  }

  override fun getName(): String = NAME

  override fun initialize() {
    super.initialize()
    reactContext.addLifecycleEventListener(this)
  }

  private fun initializeHandlers() {
    if (!mIsInitialized) {
      mAvoidSoftInputProvider = AvoidSoftInputProvider(reactContext).initializeProvider()
      mAvoidSoftInputProvider?.setSoftInputListener(this)
      reactContext.currentActivity?.window?.decorView?.rootView?.viewTreeObserver?.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = true
    }
  }

  private fun cleanupHandlers() {
    if (mIsInitialized) {
      mAvoidSoftInputProvider?.dismiss()
      mAvoidSoftInputProvider?.setSoftInputListener(null)
      mAvoidSoftInputProvider = null
      reactContext.currentActivity?.window?.decorView?.rootView?.viewTreeObserver?.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = false
    }
  }

  @ReactMethod
  fun setEnabled(isEnabled: Boolean) {
    mIsEnabled = isEnabled
  }

  @ReactMethod
  fun setAvoidOffset(avoidOffset: Float) {
    mAvoidOffset = PixelUtil.toPixelFromDIP(avoidOffset)
  }

  @ReactMethod
  fun setAdjustNothing() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
  }

  @ReactMethod
  fun setAdjustPan() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
  }

  @ReactMethod
  fun setAdjustResize() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
  }

  @ReactMethod
  fun setAdjustUnspecified() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED)
  }

  @ReactMethod
  fun setDefaultAppSoftInputMode() {
    setSoftInputMode(mDefaultSoftInputMode)
  }

  private fun setSoftInputMode(mode: Int) {
    val activity = reactContext.currentActivity ?: return

    UiThreadUtil.runOnUiThread {
      activity.window.setSoftInputMode(mode)
    }
  }

  override fun onSoftInputShown(from: Int, to: Int) {
    sendEvent(SOFT_INPUT_SHOWN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, convertFromPixelToDIP(to))
    })

    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView
    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView

    if (!mIsEnabled || currentFocusedView == null || checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView)) {
      return
    }

    val keyboardOffset = computeKeyboardOffset(to, currentFocusedView, rootView, rootView) ?: return
    mScrollViewParent = getScrollViewParent(currentFocusedView, rootView)

    mBottomOffset = keyboardOffset + mAvoidOffset
    val scrollViewParent = mScrollViewParent
    mCurrentBottomPadding = scrollViewParent?.paddingBottom ?: 0

    UiThreadUtil.runOnUiThread {
      ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = INCREASE_PADDING_DURATION_IN_MS
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            if (scrollViewParent != null) {
              val positionInScrollView = getPositionYRelativeToScrollViewParent(currentFocusedView, rootView)
              scrollViewParent.smoothScrollTo(0, positionInScrollView)
            }
          }
        })
        addUpdateListener {
          if (scrollViewParent != null) {
            scrollViewParent.setPadding(
              scrollViewParent.paddingLeft,
              scrollViewParent.paddingTop,
              scrollViewParent.paddingRight,
              mCurrentBottomPadding + (it.animatedValue as Float).toInt()
            )
          } else {
            rootView.translationY = -(it.animatedValue as Float)
          }
        }
        start()
      }
    }
    mIsRootViewSlideUp = true
  }

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendEvent(SOFT_INPUT_HIDDEN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, 0)
    })

    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView
    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView

    if (!mIsRootViewSlideUp || !mIsEnabled || currentFocusedView == null || checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView)) {
      return
    }

    mIsRootViewSlideUp = false
    val scrollViewParent = mScrollViewParent

    UiThreadUtil.runOnUiThread {
      ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = DECREASE_PADDING_DURATION_IN_MS
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            if (scrollViewParent != null) {
              val positionInScrollView = getPositionYRelativeToScrollViewParent(currentFocusedView, rootView)
              scrollViewParent.smoothScrollTo(0, positionInScrollView)
            }
            mScrollViewParent = null
            mCurrentBottomPadding = 0
          }
        })
        addUpdateListener {
          if (scrollViewParent != null) {
            scrollViewParent.setPadding(
              scrollViewParent.paddingLeft,
              scrollViewParent.paddingTop,
              scrollViewParent.paddingRight,
              mCurrentBottomPadding + (it.animatedValue as Float).toInt()
            )
          } else {
            rootView.translationY = -(it.animatedValue as Float)
          }
        }
        start()
      }
    }
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  companion object {
    const val NAME = "AvoidSoftInput"
    const val INCREASE_PADDING_DURATION_IN_MS: Long = 660
    const val DECREASE_PADDING_DURATION_IN_MS: Long = 220
    const val SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    const val SOFT_INPUT_SHOWN = "softInputShown"
    const val SOFT_INPUT_HIDDEN = "softInputHidden"
  }

  override fun onHostResume() {
    initializeHandlers()
  }

  override fun onHostPause() {}

  override fun onHostDestroy() {
    cleanupHandlers()
  }
}
