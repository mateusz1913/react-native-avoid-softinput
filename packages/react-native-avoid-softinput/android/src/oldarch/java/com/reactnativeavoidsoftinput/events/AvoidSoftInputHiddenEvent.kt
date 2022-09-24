package com.reactnativeavoidsoftinput.events

class AvoidSoftInputHiddenEvent(
  // available from RN 0.65
  surfaceId: Int,
  viewId: Int,
  height: Int
) : BaseAvoidSoftInputEvent(surfaceId, viewId, height) {
  override fun getEventName() = NAME

  companion object {
    const val NAME = "topSoftInputHidden"
  }
}
