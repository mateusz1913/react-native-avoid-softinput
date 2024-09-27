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

class AvoidSoftInputModuleImpl(private val reactContext: ReactApplicationContext) :
    LifecycleEventListener, SoftInputListener {
    private var defaultSoftInputMode: Int =
        reactContext.currentActivity?.window?.attributes?.softInputMode
            ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED

    private var managerInstance: AvoidSoftInputManager? = null
    private val manager: AvoidSoftInputManager
        get() {
            synchronized(this) {
                val instance =
                    managerInstance
                        ?: return AvoidSoftInputManager(reactContext).apply {
                            setIsEnabled(false)
                            setRootView(getReactRootView(reactContext) as View?)
                            setOnOffsetChangedListener { offset: Int ->
                                sendAppliedOffsetChangedEvent(offset)
                            }
                            setOnSoftInputEventsListener(this@AvoidSoftInputModuleImpl)
                            managerInstance = this
                        }
                return instance
            }
        }

    fun onInitialize() {
        defaultSoftInputMode =
            reactContext.currentActivity?.window?.attributes?.softInputMode
                ?: WindowManager.LayoutParams.SOFT_INPUT_STATE_UNSPECIFIED
        reactContext.addLifecycleEventListener(this)
    }

    fun onInvalidate() {
        if (managerInstance != null) {
            manager.cleanupHandlers()
            managerInstance = null
        }
    }

    fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
        manager.setShouldMimicIOSBehavior(shouldMimic)
    }

    fun setEnabled(isEnabled: Boolean) {
        manager.setIsEnabled(isEnabled)
    }

    fun setAvoidOffset(avoidOffset: Float) {
        manager.setAvoidOffset(avoidOffset)
    }

    fun setEasing(easing: String) {
        manager.setEasing(easing)
    }

    fun setHideAnimationDelay(delay: Int?) {
        manager.setHideAnimationDelay(delay)
    }

    fun setHideAnimationDuration(duration: Int?) {
        manager.setHideAnimationDuration(duration)
    }

    fun setShowAnimationDelay(delay: Int?) {
        manager.setShowAnimationDelay(delay)
    }

    fun setShowAnimationDuration(duration: Int?) {
        manager.setShowAnimationDuration(duration)
    }

    fun setAdjustNothing() {
        setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING)
    }

    fun setAdjustPan() {
        setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)
    }

    fun setAdjustResize() {
        @Suppress("DEPRECATION")
        setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE)
    }

    fun setAdjustUnspecified() {
        setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED)
    }

    fun setDefaultAppSoftInputMode() {
        setSoftInputMode(defaultSoftInputMode)
    }

    private fun setSoftInputMode(mode: Int) {
        val activity = reactContext.currentActivity ?: return

        UiThreadUtil.runOnUiThread { activity.window.setSoftInputMode(mode) }
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
            Arguments.createMap().apply { putInt(SOFT_INPUT_APPLIED_OFFSET_KEY, offset) }
        )
    }

    private fun sendHeightChangedEvent(height: Int) {
        sendEvent(
            SOFT_INPUT_HEIGHT_CHANGED,
            Arguments.createMap().apply { putInt(SOFT_INPUT_HEIGHT_KEY, height) }
        )
    }

    private fun sendHiddenEvent(height: Int) {
        sendEvent(
            SOFT_INPUT_HIDDEN,
            Arguments.createMap().apply { putInt(SOFT_INPUT_HEIGHT_KEY, height) }
        )
    }

    private fun sendShownEvent(height: Int) {
        sendEvent(
            SOFT_INPUT_SHOWN,
            Arguments.createMap().apply { putInt(SOFT_INPUT_HEIGHT_KEY, height) }
        )
    }

    override fun onHostResume() {
        manager.initializeHandlers()
    }

    override fun onHostPause() {}

    override fun onHostDestroy() {
        onInvalidate()
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
