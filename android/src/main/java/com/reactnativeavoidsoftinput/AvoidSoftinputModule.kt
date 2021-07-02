package com.reactnativeavoidsoftinput

import android.animation.ValueAnimator
import android.view.View
import android.view.ViewTreeObserver
import android.view.WindowManager
import android.widget.ScrollView
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.uimanager.DisplayMetricsHolder

class AvoidSoftinputModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, AvoidSoftinputProvider.SoftInputListener {
  private var mIsInitialized = false
  private var mIsEnabled = false
  private var mAvoidSoftinputProvider: AvoidSoftinputProvider? = null
  private var mCurrentFocusedView: View? = null
  private var mIsRootViewSlideUp = false
  private var mDefaultSoftInputMode: Int = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED

  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { _, newView ->
    mCurrentFocusedView = newView
  }

  override fun getName(): String = NAME

  override fun initialize() {
    super.initialize()
    reactContext.addLifecycleEventListener(this)
  }

  private fun initializeHandlers() {
    if (!mIsInitialized) {
      mAvoidSoftinputProvider = AvoidSoftinputProvider(reactContext).initializeProvider()
      mAvoidSoftinputProvider?.setSoftInputListener(this)
      reactContext.currentActivity?.window?.decorView?.rootView?.viewTreeObserver?.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = true
    }
  }

  private fun cleanupHandlers() {
    if (mIsInitialized) {
      mAvoidSoftinputProvider?.dismiss()
      mAvoidSoftinputProvider?.setSoftInputListener(null)
      mAvoidSoftinputProvider = null
      reactContext.currentActivity?.window?.decorView?.rootView?.viewTreeObserver?.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = false
    }
  }

  @ReactMethod
  fun setEnabled(isEnabled: Boolean) {
    mIsEnabled = isEnabled
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

  override fun onSoftInputShown(from: Int, to: Int) {
    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView
    val currentFocusedView = mCurrentFocusedView

    var shouldAvoidSoftInput = false

    if (currentFocusedView != null) {
      val screenHeight = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels
      val positionInRootView = getRelativeY(currentFocusedView, rootView)
      if (screenHeight - to <= positionInRootView + currentFocusedView.height) {
        shouldAvoidSoftInput = true
      }

      val scrollView = getScrollViewParent(currentFocusedView, rootView)
      if (shouldAvoidSoftInput && scrollView != null) {
        val positionInScrollView = getPositionYRelativeToScrollViewParent(currentFocusedView, rootView)
        scrollView.smoothScrollTo(0, positionInScrollView)
      }
    }

    sendEvent(SOFT_INPUT_SHOWN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, to)
    })

    if (!shouldAvoidSoftInput || !mIsEnabled) {
      return
    }

    ValueAnimator.ofInt(0, to).apply {
      duration = INCREASE_PADDING_DURATION_IN_MS
      addUpdateListener {
        rootView.setPadding(rootView.paddingLeft, rootView.paddingTop, rootView.paddingRight, it.animatedValue as Int)
      }
      start()
    }
    mIsRootViewSlideUp = true
  }

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendEvent(SOFT_INPUT_HIDDEN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, 0)
    })

    if (!mIsRootViewSlideUp || !mIsEnabled) {
      return
    }

    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView

    mIsRootViewSlideUp = false
    ValueAnimator.ofInt(from, 0).apply {
      duration = DECREASE_PADDING_DURATION_IN_MS
      addUpdateListener {
        rootView.setPadding(rootView.paddingLeft, rootView.paddingTop, rootView.paddingRight, it.animatedValue as Int)
      }
      start()
    }
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  private fun setSoftInputMode(mode: Int) {
    val activity = reactContext.currentActivity ?: return

    UiThreadUtil.runOnUiThread {
      activity.window.setSoftInputMode(mode)
    }
  }

  private fun getRelativeY(view: View, rootView: View): Int {
    if (view.parent == rootView) {
      return view.top
    }

    return view.top + getRelativeY(view.parent as View, rootView)
  }

  private fun getPositionYRelativeToScrollViewParent(view: View, rootView: View): Int {
    if (view.parent == rootView || view.parent is ScrollView) {
      return view.top
    }

    return view.top + getPositionYRelativeToScrollViewParent(view.parent as View, rootView)
  }

  private fun getScrollViewParent(view: View, rootView: View): ScrollView? {
    if (view.parent == rootView) {
      return null
    }

    if (view.parent is ScrollView) {
      return view.parent as ScrollView
    }

    return getScrollViewParent(view.parent as View, rootView)
  }

  companion object {
    const val NAME = "AvoidSoftinput"
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
