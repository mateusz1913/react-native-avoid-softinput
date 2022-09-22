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
class AvoidSoftInputView(
  private val reactContext: ThemedReactContext
) : ReactViewGroup(reactContext), SoftInputListener {
  private val mManager = AvoidSoftInputManager(reactContext.reactApplicationContext).apply {
    setIsEnabled(true)
    setRootView(this@AvoidSoftInputView)
    setOnOffsetChangedListener { offset: Int ->
      sendAppliedOffsetChangedEvent(offset)
    }
    setOnSoftInputEventsListener(this@AvoidSoftInputView)
  }

  private fun getEventDispatcher() = getEventDispatcher(reactContext, this)

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    mManager.initializeHandlers()
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    mManager.cleanupHandlers()
  }

  fun setAvoidOffset(avoidOffset: Float) {
    mManager.setAvoidOffset(avoidOffset)
  }

  fun setEasing(easing: String?) {
    mManager.setEasing(easing)
  }

  fun setIsEnabled(enabled: Boolean) {
    mManager.setIsEnabled(enabled)
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
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputAppliedOffsetChangedEvent(getSurfaceId(reactContext), this.id, offset))
  }

  private fun sendHeightChangedEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputHeightChangedEvent(getSurfaceId(reactContext), this.id, height))
  }

  private fun sendHiddenEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputHiddenEvent(getSurfaceId(reactContext), this.id, height))
  }

  private fun sendShownEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputShownEvent(getSurfaceId(reactContext), this.id, height))
  }

  companion object {
    const val NAME = "AvoidSoftInputView"
    const val ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE = "onSoftInputAppliedOffsetChange"
    const val ON_SOFT_INPUT_HIDDEN = "onSoftInputHidden"
    const val ON_SOFT_INPUT_SHOWN = "onSoftInputShown"
    const val ON_SOFT_INPUT_HEIGHT_CHANGE = "onSoftInputHeightChange"
  }
}
