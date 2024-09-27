package com.reactnativeavoidsoftinput

import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.views.view.ReactViewGroup
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHeightChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent
import com.reactnativeavoidsoftinput.listeners.SoftInputListener

@SuppressLint("ViewConstructor")
class AvoidSoftInputView(private val reactContext: ThemedReactContext) :
    ReactViewGroup(reactContext), SoftInputListener {
    private var managerInstance: AvoidSoftInputManager? = null
    private val manager: AvoidSoftInputManager
        get() {
            synchronized(this) {
                val instance =
                    managerInstance
                        ?: return AvoidSoftInputManager(reactContext.reactApplicationContext)
                            .apply {
                                setIsEnabled(true)
                                setRootView(this@AvoidSoftInputView)
                                setOnOffsetChangedListener { offset: Int ->
                                    sendAppliedOffsetChangedEvent(offset)
                                }
                                setOnSoftInputEventsListener(this@AvoidSoftInputView)
                                managerInstance = this
                            }
                return instance
            }
        }

    private fun getEventDispatcher() = getEventDispatcher(reactContext, this)

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        manager.initializeHandlers()
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        cleanup()
    }

    fun cleanup() {
        manager.cleanupHandlers()
        managerInstance = null
    }

    fun setAvoidOffset(avoidOffset: Float) {
        manager.setAvoidOffset(avoidOffset)
    }

    fun setEasing(easing: String?) {
        manager.setEasing(easing)
    }

    fun setIsEnabled(enabled: Boolean) {
        manager.setIsEnabled(enabled)
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

    override fun onSoftInputShown(from: Int, to: Int) {
        sendShownEvent(convertFromPixelToDIP(to))
    }

    override fun onSoftInputHidden(from: Int, to: Int) {
        sendHiddenEvent(convertFromPixelToDIP(0))
    }

    override fun onSoftInputHeightChange(from: Int, to: Int, isOrientationChanged: Boolean) {
        sendHeightChangedEvent(convertFromPixelToDIP(to))
    }

    private fun sendAppliedOffsetChangedEvent(offset: Int) {
        getEventDispatcher()
            ?.dispatchEvent(
                AvoidSoftInputAppliedOffsetChangedEvent(getSurfaceId(reactContext), this.id, offset)
            )
    }

    private fun sendHeightChangedEvent(height: Int) {
        getEventDispatcher()
            ?.dispatchEvent(
                AvoidSoftInputHeightChangedEvent(getSurfaceId(reactContext), this.id, height)
            )
    }

    private fun sendHiddenEvent(height: Int) {
        getEventDispatcher()
            ?.dispatchEvent(AvoidSoftInputHiddenEvent(getSurfaceId(reactContext), this.id, height))
    }

    private fun sendShownEvent(height: Int) {
        getEventDispatcher()
            ?.dispatchEvent(AvoidSoftInputShownEvent(getSurfaceId(reactContext), this.id, height))
    }

    companion object {
        const val NAME = "AvoidSoftInputView"
        const val ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE = "onSoftInputAppliedOffsetChange"
        const val ON_SOFT_INPUT_HIDDEN = "onSoftInputHidden"
        const val ON_SOFT_INPUT_SHOWN = "onSoftInputShown"
        const val ON_SOFT_INPUT_HEIGHT_CHANGE = "onSoftInputHeightChange"
    }
}
