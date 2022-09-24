package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class AvoidSoftInputAppliedOffsetChangedEvent(
  surfaceId: Int,
  viewTag: Int,
  private val offset: Int
) : Event<AvoidSoftInputAppliedOffsetChangedEvent>(surfaceId, viewTag) {
  override fun getEventName() = NAME

  override fun getEventData(): WritableMap? {
    return createPayload()
  }

  private fun createPayload() = Arguments.createMap().apply {
    putInt(KEY, offset)
  }

  companion object {
    private const val KEY = "appliedOffset"
    const val NAME = "topSoftInputAppliedOffsetChange"
  }
}
