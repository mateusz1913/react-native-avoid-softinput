package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.uimanager.events.Event
import com.facebook.react.uimanager.events.RCTEventEmitter

abstract class BaseAvoidSoftInputEvent(viewId: Int, private val height: Int) : Event<BaseAvoidSoftInputEvent>(viewId) {
  override fun dispatch(rctEventEmitter: RCTEventEmitter?) {
    rctEventEmitter?.receiveEvent(viewTag, eventName, createPayload())
  }

  private fun createPayload() = Arguments.createMap().apply {
    putInt(KEY, height)
  }

  companion object {
    private const val KEY = "softInputHeight"
  }
}
