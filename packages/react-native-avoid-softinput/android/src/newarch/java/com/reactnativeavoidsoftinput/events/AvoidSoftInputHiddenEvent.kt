package com.reactnativeavoidsoftinput.events

class AvoidSoftInputHiddenEvent(
  surfaceId: Int,
  viewTag: Int,
  height: Int
) : BaseAvoidSoftInputEvent(surfaceId, viewTag, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputHidden"
  }
}
