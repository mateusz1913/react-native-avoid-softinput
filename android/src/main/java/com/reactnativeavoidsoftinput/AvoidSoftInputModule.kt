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

class AvoidSoftInputModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, AvoidSoftInputProvider.SoftInputListener, AvoidSoftInput {
  override var mAnimationInterpolator = AvoidSoftInputInterpolator()
  override var mAvoidOffset: Float = 0F
  override var mAvoidSoftInputProvider: AvoidSoftInputProvider? = null
  override var mBottomOffset: Float = 0F
  override var mCurrentFocusedView: View? = null
  override var mCurrentBottomPadding: Int = 0
  override var mHideValueAnimator: ValueAnimator? = null
  override var mHideAnimationDelay: Long = 0
  override var mHideAnimationDuration = DECREASE_PADDING_DURATION_IN_MS
  override var mIsInitialized = false
  override var mIsViewSlideUp = false
  override var mIsViewSlidingDown = false
  override var mIsViewSlidingUp = false
  override var mPreviousFocusedView: View? = null
  override var mScrollViewParent: ScrollView? = null
  override var mScrollY: Int = 0
  override var mShowAnimationDelay: Long = 0
  override var mShowAnimationDuration = INCREASE_PADDING_DURATION_IN_MS
  override var mShowValueAnimator: ValueAnimator? = null

  override val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView
  }

  private var mDefaultSoftInputMode: Int = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED
  private var mIsEnabled = false

  override fun getName(): String = NAME

  override fun initialize() {
    super.initialize()
    reactContext.addLifecycleEventListener(this)
  }

  @ReactMethod
  fun setEnabled(isEnabled: Boolean) {
    mIsEnabled = isEnabled
  }

  @ReactMethod
  override fun setAvoidOffset(avoidOffset: Float) {
    super.setAvoidOffset(avoidOffset)
  }

  @ReactMethod
  override fun setEasing(easing: String) {
    super.setEasing(easing)
  }

  @ReactMethod
  override fun setHideAnimationDelay(delay: Int?) {
    super.setHideAnimationDelay(delay)
  }

  @ReactMethod
  override fun setHideAnimationDuration(duration: Int?) {
    super.setHideAnimationDuration(duration)
  }

  @ReactMethod
  override fun setShowAnimationDelay(delay: Int?) {
    super.setShowAnimationDelay(delay)
  }

  @ReactMethod
  override fun setShowAnimationDuration(duration: Int?) {
    super.setShowAnimationDuration(duration)
  }

  @ReactMethod
  fun addListener(eventName: String) {}

  @ReactMethod
  fun removeListeners(count: Int) {}

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
    sendShownEvent(convertFromPixelToDIP(to))

    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView
    val rootView = getReactRootView(currentFocusedView)

    if (
      mIsViewSlideUp
      || mIsViewSlidingUp
      || !mIsEnabled
      || currentFocusedView == null
      || checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView)
      || rootView !is View
    ) {
      return
    }

    mIsViewSlidingUp = true

    val softInputOffset = computeSoftInputOffset(to, currentFocusedView, rootView)

    if (softInputOffset == null) {
      mIsViewSlidingUp = false
      return
    }

    mScrollViewParent = getScrollViewParent(currentFocusedView, rootView)

    mBottomOffset = softInputOffset + mAvoidOffset
    val scrollViewParent = mScrollViewParent
    mCurrentBottomPadding = scrollViewParent?.paddingBottom ?: 0

    UiThreadUtil.runOnUiThread {
      mHideValueAnimator?.end()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(0))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(mBottomOffset.toInt()))
            if (scrollViewParent != null) {
              mScrollY = scrollViewParent.scrollY
              scrollViewParent.smoothScrollTo(0, (scrollViewParent.scrollY + mBottomOffset).toInt())
            }
            mIsViewSlidingUp = false
            mIsViewSlideUp = true
            mShowValueAnimator = null
          }
        })
        addUpdateListener {
          sendAppliedOffsetChangedEvent(convertFromPixelToDIP((it.animatedValue as Float).toInt()))
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

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendHiddenEvent(convertFromPixelToDIP(0))

    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView
    val rootView = getReactRootView(currentFocusedView)

    if (
      (!mIsViewSlideUp && !mIsViewSlidingUp)
      || mIsViewSlidingDown
      || !mIsEnabled
      || currentFocusedView == null
      || checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView)
      || rootView !is View
    ) {
      return
    }

    mIsViewSlidingDown = true

    val scrollViewParent = mScrollViewParent

    UiThreadUtil.runOnUiThread {
      mShowValueAnimator?.end()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(mBottomOffset.toInt()))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(0))
            if (scrollViewParent != null) {
              scrollViewParent.smoothScrollTo(0, mScrollY)
              mScrollY = 0
            }
            mScrollViewParent = null
            mCurrentBottomPadding = 0
            mIsViewSlideUp = false
            mIsViewSlidingDown = false
            mHideValueAnimator = null
          }
        })
        addUpdateListener {
          sendAppliedOffsetChangedEvent(convertFromPixelToDIP((it.animatedValue as Float).toInt()))
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

  override fun sendAppliedOffsetChangedEvent(offset: Int) {
    sendEvent(SOFT_INPUT_APPLIED_OFFSET_CHANGED, Arguments.createMap().apply {
      putInt(SOFT_INPUT_APPLIED_OFFSET_KEY, offset)
    })
  }

  override fun sendHiddenEvent(height: Int) {
    sendEvent(SOFT_INPUT_HIDDEN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, height)
    })
  }

  override fun sendShownEvent(height: Int) {
    sendEvent(SOFT_INPUT_SHOWN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, height)
    })
  }

  companion object {
    const val NAME = "AvoidSoftInput"
    const val INCREASE_PADDING_DURATION_IN_MS: Long = 660
    const val DECREASE_PADDING_DURATION_IN_MS: Long = 220
    const val SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"
    const val SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    const val SOFT_INPUT_APPLIED_OFFSET_CHANGED = "softInputAppliedOffsetChanged"
    const val SOFT_INPUT_HIDDEN = "softInputHidden"
    const val SOFT_INPUT_SHOWN = "softInputShown"
  }

  override fun onHostResume() {
    initializeHandlers(reactContext, this, reactContext.currentActivity?.window?.decorView?.rootView)
  }

  override fun onHostPause() {}

  override fun onHostDestroy() {
    cleanupHandlers(reactContext.currentActivity?.window?.decorView?.rootView)
  }
}
