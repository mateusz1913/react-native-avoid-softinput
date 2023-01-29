package com.reactnativeavoidsoftinput.events

class AvoidSoftInputShownEvent(
  surfaceId: Int,
  viewTag: Int,
  height: Int
) : BaseAvoidSoftInputEvent(surfaceId, viewTag, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputShown"
  }
}
