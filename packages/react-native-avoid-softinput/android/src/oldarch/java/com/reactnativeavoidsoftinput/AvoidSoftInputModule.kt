package com.reactnativeavoidsoftinput

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = AvoidSoftInputModuleImpl.NAME)
class AvoidSoftInputModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {
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

    @ReactMethod
    fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
        moduleImpl.setShouldMimicIOSBehavior(shouldMimic)
    }

    @ReactMethod
    fun setEnabled(isEnabled: Boolean) {
        moduleImpl.setEnabled(isEnabled)
    }

    @ReactMethod
    fun setAvoidOffset(avoidOffset: Float) {
        moduleImpl.setAvoidOffset(avoidOffset)
    }

    @ReactMethod
    fun setEasing(easing: String) {
        moduleImpl.setEasing(easing)
    }

    @ReactMethod
    fun setHideAnimationDelay(delay: Int?) {
        moduleImpl.setHideAnimationDelay(delay)
    }

    @ReactMethod
    fun setHideAnimationDuration(duration: Int?) {
        moduleImpl.setHideAnimationDuration(duration)
    }

    @ReactMethod
    fun setShowAnimationDelay(delay: Int?) {
        moduleImpl.setShowAnimationDelay(delay)
    }

    @ReactMethod
    fun setShowAnimationDuration(duration: Int?) {
        moduleImpl.setShowAnimationDuration(duration)
    }

    @ReactMethod fun addListener(@Suppress("UNUSED_PARAMETER") eventName: String) {}

    @ReactMethod fun removeListeners(@Suppress("UNUSED_PARAMETER") count: Int) {}

    @ReactMethod
    fun setAdjustNothing() {
        moduleImpl.setAdjustNothing()
    }

    @ReactMethod
    fun setAdjustPan() {
        moduleImpl.setAdjustPan()
    }

    @ReactMethod
    fun setAdjustResize() {
        moduleImpl.setAdjustResize()
    }

    @ReactMethod
    fun setAdjustUnspecified() {
        moduleImpl.setAdjustUnspecified()
    }

    @ReactMethod
    fun setDefaultAppSoftInputMode() {
        moduleImpl.setDefaultAppSoftInputMode()
    }
}
