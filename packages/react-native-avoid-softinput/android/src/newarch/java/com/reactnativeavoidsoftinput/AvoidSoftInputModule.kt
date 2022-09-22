package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AvoidSoftInputModuleImpl.NAME)
class AvoidSoftInputModule(
  reactContext: ReactApplicationContext
) : NativeAvoidSoftInputModuleSpec(reactContext) {
  private var mModuleImpl = AvoidSoftInputModuleImpl(reactContext)

  override fun getName(): String = AvoidSoftInputModuleImpl.NAME

  override fun initialize() {
    super.initialize()

    mModuleImpl.onInitialize()
  }

  override fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
    mModuleImpl.setShouldMimicIOSBehavior(shouldMimic)
  }

  override fun setEnabled(isEnabled: Boolean) {
    mModuleImpl.setEnabled(isEnabled)
  }

  override fun setAvoidOffset(avoidOffset: Double) {
    mModuleImpl.setAvoidOffset(avoidOffset.toFloat())
  }

  override fun setEasing(easing: String) {
    mModuleImpl.setEasing(easing)
  }

  override fun setHideAnimationDelay(delay: Double?) {
    mModuleImpl.setHideAnimationDelay(delay?.toInt())
  }

  override fun setHideAnimationDuration(duration: Double?) {
    mModuleImpl.setHideAnimationDuration(duration?.toInt())
  }

  override fun setShowAnimationDelay(delay: Double?) {
    mModuleImpl.setShowAnimationDelay(delay?.toInt())
  }

  override fun setShowAnimationDuration(duration: Double?) {
    mModuleImpl.setShowAnimationDuration(duration?.toInt())
  }

  override fun addListener(eventName: String) {}

  override fun removeListeners(count: Double) {}

  override fun setAdjustNothing() {
    mModuleImpl.setAdjustNothing()
  }

  override fun setAdjustPan() {
    mModuleImpl.setAdjustPan()
  }

  override fun setAdjustResize() {
    mModuleImpl.setAdjustResize()
  }

  override fun setAdjustUnspecified() {
    mModuleImpl.setAdjustUnspecified()
  }

  override fun setDefaultAppSoftInputMode() {
    mModuleImpl.setDefaultAppSoftInputMode()
  }
}
