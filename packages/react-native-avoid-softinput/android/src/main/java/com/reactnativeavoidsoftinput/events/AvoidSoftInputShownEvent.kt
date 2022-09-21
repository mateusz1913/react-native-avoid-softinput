package com.reactnativeavoidsoftinput.events

class AvoidSoftInputShownEvent(viewId: Int, height: Int) : BaseAvoidSoftInputEvent(viewId, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputShown"
  }
}
