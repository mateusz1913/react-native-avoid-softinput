package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AvoidSoftInputModuleImpl.NAME)
class AvoidSoftInputModule(reactContext: ReactApplicationContext) :
    NativeAvoidSoftInputModuleSpec(reactContext) {
    private var moduleImpl = AvoidSoftInputModuleImpl(reactContext)

    override fun getName(): String = AvoidSoftInputModuleImpl.NAME

    override fun initialize() {
        super.initialize()

        moduleImpl.onInitialize()
    }

    override fun invalidate() {
        moduleImpl.onInvalidate()

        super.invalidate()
    }

    override fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
        moduleImpl.setShouldMimicIOSBehavior(shouldMimic)
    }

    override fun setEnabled(isEnabled: Boolean) {
        moduleImpl.setEnabled(isEnabled)
    }

    override fun setAvoidOffset(avoidOffset: Double) {
        moduleImpl.setAvoidOffset(avoidOffset.toFloat())
    }

    override fun setEasing(easing: String) {
        moduleImpl.setEasing(easing)
    }

    override fun setHideAnimationDelay(delay: Double?) {
        moduleImpl.setHideAnimationDelay(delay?.toInt())
    }

    override fun setHideAnimationDuration(duration: Double?) {
        moduleImpl.setHideAnimationDuration(duration?.toInt())
    }

    override fun setShowAnimationDelay(delay: Double?) {
        moduleImpl.setShowAnimationDelay(delay?.toInt())
    }

    override fun setShowAnimationDuration(duration: Double?) {
        moduleImpl.setShowAnimationDuration(duration?.toInt())
    }

    override fun addListener(@Suppress("UNUSED_PARAMETER") eventName: String) {}

    override fun removeListeners(@Suppress("UNUSED_PARAMETER") count: Double) {}

    override fun setAdjustNothing() {
        moduleImpl.setAdjustNothing()
    }

    override fun setAdjustPan() {
        moduleImpl.setAdjustPan()
    }

    override fun setAdjustResize() {
        moduleImpl.setAdjustResize()
    }

    override fun setAdjustUnspecified() {
        moduleImpl.setAdjustUnspecified()
    }

    override fun setDefaultAppSoftInputMode() {
        moduleImpl.setDefaultAppSoftInputMode()
    }
}
