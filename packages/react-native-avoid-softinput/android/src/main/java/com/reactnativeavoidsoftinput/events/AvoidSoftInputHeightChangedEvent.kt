package com.reactnativeavoidsoftinput.events

class AvoidSoftInputHeightChangedEvent(viewId: Int, height: Int): BaseAvoidSoftInputEvent(viewId, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputHeightChange"
  }
}
