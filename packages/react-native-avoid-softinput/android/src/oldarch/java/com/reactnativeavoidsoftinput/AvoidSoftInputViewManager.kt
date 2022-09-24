package com.reactnativeavoidsoftinput

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewManager
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHeightChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent

class AvoidSoftInputViewManager : ReactViewManager() {
  override fun getName(): String {
    return AvoidSoftInputView.NAME
  }

  override fun createViewInstance(reactContext: ThemedReactContext): AvoidSoftInputView {
    return AvoidSoftInputView(reactContext)
  }

  @ReactProp(name = "avoidOffset")
  fun setAvoidOffset(view: AvoidSoftInputView, avoidOffset: Float) {
    view.setAvoidOffset(avoidOffset)
  }

  @ReactProp(name = "easing")
  fun setEasing(view: AvoidSoftInputView, easing: String) {
    view.setEasing(easing)
  }

  @ReactProp(name = "enabled", defaultBoolean = true)
  fun setIsEnabled(view: AvoidSoftInputView, enabled: Boolean) {
    view.setIsEnabled(enabled)
  }

  @ReactProp(name = "hideAnimationDelay")
  fun setHideAnimationDelay(view: AvoidSoftInputView, delay: Int?) {
    view.setHideAnimationDelay(delay)
  }

  @ReactProp(name = "hideAnimationDuration")
  fun setHideAnimationDuration(view: AvoidSoftInputView, duration: Int?) {
    view.setHideAnimationDuration(duration)
  }

  @ReactProp(name = "showAnimationDelay")
  fun setShowAnimationDelay(view: AvoidSoftInputView, delay: Int?) {
    view.setShowAnimationDelay(delay)
  }

  @ReactProp(name = "showAnimationDuration")
  fun setShowAnimationDuration(view: AvoidSoftInputView, duration: Int?) {
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
