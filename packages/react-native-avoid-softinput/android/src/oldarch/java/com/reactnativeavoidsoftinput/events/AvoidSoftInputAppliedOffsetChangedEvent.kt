package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class AvoidSoftInputAppliedOffsetChangedEvent(
  // available from RN 0.65
  surfaceId: Int,
  viewId: Int,
  private val offset: Int
) : Event<AvoidSoftInputAppliedOffsetChangedEvent>(surfaceId, viewId) {
  override fun getEventName() = NAME

  // available from RN 0.65
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
