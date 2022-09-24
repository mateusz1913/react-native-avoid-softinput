package com.reactnativeavoidsoftinput

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.AvoidSoftInputViewManagerInterface
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.react.views.view.ReactViewManager
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHeightChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent

class AvoidSoftInputViewManager : ReactViewManager(), AvoidSoftInputViewManagerInterface<AvoidSoftInputView> {
  override fun getName(): String {
    return AvoidSoftInputView.NAME
  }

  // ReactViewManager is not generic, so it doesn't let to pass any view that extends ReactViewGroup
  // However, ReactViewManager does not use any delegate, so we can skip it and handle props here
  override fun getDelegate(): ViewManagerDelegate<ReactViewGroup>? = null

  override fun createViewInstance(reactContext: ThemedReactContext): AvoidSoftInputView {
    return AvoidSoftInputView(reactContext)
  }

  @ReactProp(name = "avoidOffset")
  override fun setAvoidOffset(view: AvoidSoftInputView, avoidOffset: Float) {
    view.setAvoidOffset(avoidOffset)
  }

  @ReactProp(name = "easing")
  override fun setEasing(view: AvoidSoftInputView, easing: String?) {
    view.setEasing(easing)
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  override fun setEnabled(view: AvoidSoftInputView, enabled: Boolean) {
    view.setIsEnabled(enabled)
  }

  @ReactProp(name = "hideAnimationDelay")
  override fun setHideAnimationDelay(view: AvoidSoftInputView, delay: Int) {
    view.setHideAnimationDelay(delay)
  }

  @ReactProp(name = "hideAnimationDuration")
  override fun setHideAnimationDuration(view: AvoidSoftInputView, duration: Int) {
    view.setHideAnimationDuration(duration)
  }

  @ReactProp(name = "showAnimationDelay")
  override fun setShowAnimationDelay(view: AvoidSoftInputView, delay: Int) {
    view.setShowAnimationDelay(delay)
  }

  @ReactProp(name = "showAnimationDuration")
  override fun setShowAnimationDuration(view: AvoidSoftInputView, duration: Int) {
    view.setShowAnimationDuration(duration)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    return MapBuilder.of(
      AvoidSoftInputAppliedOffsetChangedEvent.NAME,
      MapBuilder.of("registrationName", AvoidSoftInputView.ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE),
      AvoidSoftInputHeightChangedEvent.NAME,
      MapBuilder.of("registrationName", AvoidSoftInputView.ON_SOFT_INPUT_HEIGHT_CHANGE),
      AvoidSoftInputHiddenEvent.NAME,
      MapBuilder.of("registrationName", AvoidSoftInputView.ON_SOFT_INPUT_HIDDEN),
      AvoidSoftInputShownEvent.NAME,
      MapBuilder.of("registrationName", AvoidSoftInputView.ON_SOFT_INPUT_SHOWN)
    )
  }
}
