package com.reactnativeavoidsoftinput

import android.annotation.SuppressLint
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.views.view.ReactViewGroup
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent

@SuppressLint("ViewConstructor")
class AvoidSoftInputView(
  private val reactContext: ThemedReactContext
) : ReactViewGroup(reactContext), AvoidSoftInputProvider.SoftInputListener {
  private val mManager = AvoidSoftInputManager(reactContext).apply {
    setIsEnabled(true)
    setShouldCheckForAvoidSoftInputView(false)
    setOnOffsetChangedListener { offset: Int ->
      sendAppliedOffsetChangedEvent(offset)
    }
  }

  private fun getEventDispatcher() = reactContext.getNativeModule(UIManagerModule::class.java)?.eventDispatcher

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    mManager.initializeHandlers(reactContext, this, this)
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    mManager.cleanupHandlers(this)
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

  override fun onSoftInputShown(from: Int, to: Int) {
    sendShownEvent(convertFromPixelToDIP(to))

    mManager.onSoftInputShown(to, this)
  }

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendHiddenEvent(convertFromPixelToDIP(0))

    mManager.onSoftInputHidden(this)
  }

  private fun sendAppliedOffsetChangedEvent(offset: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputAppliedOffsetChangedEvent(this.id, offset))
  }

  private fun sendHiddenEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputHiddenEvent(this.id, height))
  }

  private fun sendShownEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputShownEvent(this.id, height))
  }

  companion object {
    const val NAME = "AvoidSoftInputView"
    const val ON_SOFT_INPUT_APPLIED_OFFSET_CHANGED = "onSoftInputAppliedOffsetChange"
    const val ON_SOFT_INPUT_HIDDEN = "onSoftInputHidden"
    const val ON_SOFT_INPUT_SHOWN = "onSoftInputShown"
  }
}
