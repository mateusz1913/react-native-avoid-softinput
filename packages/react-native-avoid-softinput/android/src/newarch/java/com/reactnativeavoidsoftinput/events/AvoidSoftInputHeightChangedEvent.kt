package com.reactnativeavoidsoftinput.events

class AvoidSoftInputHeightChangedEvent(
  surfaceId: Int,
  viewTag: Int,
  height: Int
) : BaseAvoidSoftInputEvent(surfaceId, viewTag, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputHeightChange"
  }
}
