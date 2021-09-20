package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter

class AvoidSoftInputAppliedOffsetChangedEvent(viewId: Int, private val offset: Int): Event<AvoidSoftInputAppliedOffsetChangedEvent>(viewId) {
  override fun getEventName() = NAME

  override fun dispatch(rctEventEmitter: RCTEventEmitter?) {
    rctEventEmitter?.receiveEvent(viewTag, eventName, createPayload())
  }

  private fun createPayload() = Arguments.createMap().apply {
    putInt(KEY, offset)
  }

  companion object {
    private const val KEY = "appliedOffset"
    const val NAME = "topSoftInputAppliedOffsetChange"
  }
}
