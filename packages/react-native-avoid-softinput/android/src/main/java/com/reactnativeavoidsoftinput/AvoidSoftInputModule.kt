package com.reactnativeavoidsoftinput

import android.view.WindowManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule

class AvoidSoftInputModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener, AvoidSoftInputProvider.SoftInputListener {
  private var mDefaultSoftInputMode: Int = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED

  private var mManager: AvoidSoftInputManager = AvoidSoftInputManager(reactContext).apply {
    setIsEnabled(false)
    setShouldCheckForAvoidSoftInputView(true)
    setOnOffsetChangedListener { offset: Int ->
      sendAppliedOffsetChangedEvent(offset)
    }
  }

  override fun getName(): String = NAME

  override fun initialize() {
    super.initialize()

    mDefaultSoftInputMode = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED
    reactContext.addLifecycleEventListener(this)
  }

  @ReactMethod
  fun setEnabled(isEnabled: Boolean) {
    mManager.setIsEnabled(isEnabled)
  }

  @ReactMethod
  fun setAvoidOffset(avoidOffset: Float) {
    mManager.setAvoidOffset(avoidOffset)
  }

  @ReactMethod
  fun setEasing(easing: String) {
    mManager.setEasing(easing)
  }

  @ReactMethod
  fun setHideAnimationDelay(delay: Int?) {
    mManager.setHideAnimationDelay(delay)
  }

  @ReactMethod
  fun setHideAnimationDuration(duration: Int?) {
    mManager.setHideAnimationDuration(duration)
  }

  @ReactMethod
  fun setShowAnimationDelay(delay: Int?) {
    mManager.setShowAnimationDelay(delay)
  }

  @ReactMethod
  fun setShowAnimationDuration(duration: Int?) {
    mManager.setShowAnimationDuration(duration)
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
  }

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendHiddenEvent(convertFromPixelToDIP(0))
  }

  override fun onSoftInputHeightChange(from: Int, to: Int) {
    sendHeightChangedEvent(convertFromPixelToDIP(to))

    mManager.onSoftInputHeightChange(from, to)
  }

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  private fun sendAppliedOffsetChangedEvent(offset: Int) {
    sendEvent(
      SOFT_INPUT_APPLIED_OFFSET_CHANGED,
      Arguments.createMap().apply {
        putInt(SOFT_INPUT_APPLIED_OFFSET_KEY, offset)
      }
    )
  }

  private fun sendHeightChangedEvent(height: Int) {
    sendEvent(
      SOFT_INPUT_HEIGHT_CHANGED,
      Arguments.createMap().apply {
        putInt(SOFT_INPUT_HEIGHT_KEY, height)
      }
    )
  }

  private fun sendHiddenEvent(height: Int) {
    sendEvent(
      SOFT_INPUT_HIDDEN,
      Arguments.createMap().apply {
        putInt(SOFT_INPUT_HEIGHT_KEY, height)
      }
    )
  }

  private fun sendShownEvent(height: Int) {
    sendEvent(
      SOFT_INPUT_SHOWN,
      Arguments.createMap().apply {
        putInt(SOFT_INPUT_HEIGHT_KEY, height)
      }
    )
  }

  override fun onHostResume() {
    mManager.initializeHandlers(reactContext, this, reactContext.currentActivity?.window?.decorView?.rootView)
  }

  override fun onHostPause() {}

  override fun onHostDestroy() {
    mManager.cleanupHandlers(reactContext.currentActivity?.window?.decorView?.rootView)
  }

  companion object {
    const val NAME = "AvoidSoftInput"
    const val SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"
    const val SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    const val SOFT_INPUT_APPLIED_OFFSET_CHANGED = "softInputAppliedOffsetChanged"
    const val SOFT_INPUT_HIDDEN = "softInputHidden"
    const val SOFT_INPUT_SHOWN = "softInputShown"
    const val SOFT_INPUT_HEIGHT_CHANGED = "softInputHeightChanged"
  }
}
