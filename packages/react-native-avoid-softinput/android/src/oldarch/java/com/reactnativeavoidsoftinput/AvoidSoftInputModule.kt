package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AvoidSoftInputModuleImpl.NAME)
class AvoidSoftInputModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
  private var mModuleImpl = AvoidSoftInputModuleImpl(reactContext)

  override fun getName(): String = AvoidSoftInputModuleImpl.NAME

  override fun initialize() {
    super.initialize()

    mModuleImpl.onInitialize()
  }

  @ReactMethod
  fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
    mModuleImpl.setShouldMimicIOSBehavior(shouldMimic)
  }

  @ReactMethod
  fun setEnabled(isEnabled: Boolean) {
    mModuleImpl.setEnabled(isEnabled)
  }

  @ReactMethod
  fun setAvoidOffset(avoidOffset: Float) {
    mModuleImpl.setAvoidOffset(avoidOffset)
  }

  @ReactMethod
  fun setEasing(easing: String) {
    mModuleImpl.setEasing(easing)
  }

  @ReactMethod
  fun setHideAnimationDelay(delay: Int?) {
    mModuleImpl.setHideAnimationDelay(delay)
  }

  @ReactMethod
  fun setHideAnimationDuration(duration: Int?) {
    mModuleImpl.setHideAnimationDuration(duration)
  }

  @ReactMethod
  fun setShowAnimationDelay(delay: Int?) {
    mModuleImpl.setShowAnimationDelay(delay)
  }

  @ReactMethod
  fun setShowAnimationDuration(duration: Int?) {
    mModuleImpl.setShowAnimationDuration(duration)
  }

  @ReactMethod
  fun addListener(eventName: String) {}

  @ReactMethod
  fun removeListeners(count: Int) {}

  @ReactMethod
  fun setAdjustNothing() {
    mModuleImpl.setAdjustNothing()
  }

  @ReactMethod
  fun setAdjustPan() {
    mModuleImpl.setAdjustPan()
  }

  @ReactMethod
  fun setAdjustResize() {
    mModuleImpl.setAdjustResize()
  }

  @ReactMethod
  fun setAdjustUnspecified() {
    mModuleImpl.setAdjustUnspecified()
  }

  @ReactMethod
  fun setDefaultAppSoftInputMode() {
    mModuleImpl.setDefaultAppSoftInputMode()
  }
}
