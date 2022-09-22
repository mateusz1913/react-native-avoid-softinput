package com.reactnativeavoidsoftinput

import android.view.View
import android.view.WindowManager
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.LifecycleEventListener
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.reactnativeavoidsoftinput.listeners.SoftInputListener

class AvoidSoftInputModuleImpl(
  private val reactContext: ReactApplicationContext
) : LifecycleEventListener, SoftInputListener {
  private var mDefaultSoftInputMode: Int = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED

  private var mManager: AvoidSoftInputManager = AvoidSoftInputManager(reactContext).apply {
    setIsEnabled(false)
    setOnOffsetChangedListener { offset: Int ->
      sendAppliedOffsetChangedEvent(offset)
    }
    setOnSoftInputEventsListener(this@AvoidSoftInputModuleImpl)
  }

  fun onInitialize() {
    mDefaultSoftInputMode = reactContext.currentActivity?.window?.attributes?.softInputMode ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED
    reactContext.addLifecycleEventListener(this)
  }

  fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
    mManager.setShouldMimicIOSBehavior(shouldMimic)
  }

  fun setEnabled(isEnabled: Boolean) {
    mManager.setIsEnabled(isEnabled)
  }

  fun setAvoidOffset(avoidOffset: Float) {
    mManager.setAvoidOffset(avoidOffset)
  }

  fun setEasing(easing: String) {
    mManager.setEasing(easing)
  }

  fun setHideAnimationDelay(delay: Int?) {
    mManager.setHideAnimationDelay(delay)
  }

  fun setHideAnimationDuration(duration: Int?) {
    mManager.setHideAnimationDuration(duration)
  }

  fun setShowAnimationDelay(delay: Int?) {
    mManager.setShowAnimationDelay(delay)
  }

  fun setShowAnimationDuration(duration: Int?) {
    mManager.setShowAnimationDuration(duration)
  }

  fun setAdjustNothing() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
  }

  fun setAdjustPan() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
  }

  fun setAdjustResize() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
  }

  fun setAdjustUnspecified() {
    setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED)
  }

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

  override fun onSoftInputHeightChange(from: Int, to: Int, isOrientationChanged: Boolean) {
    sendHeightChangedEvent(convertFromPixelToDIP(to))
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
    mManager.setRootView(getReactRootView(reactContext) as View?)
    mManager.initializeHandlers()
  }

  override fun onHostPause() {}

  override fun onHostDestroy() {
    mManager.cleanupHandlers()
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
