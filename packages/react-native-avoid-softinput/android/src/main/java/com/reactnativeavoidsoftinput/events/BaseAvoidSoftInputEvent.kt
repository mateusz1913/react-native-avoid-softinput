package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

abstract class BaseAvoidSoftInputEvent(
  surfaceId: Int,
  viewTag: Int,
  private val height: Int
) : Event<BaseAvoidSoftInputEvent>(surfaceId, viewTag) {
  override fun getEventData(): WritableMap? {
    return createPayload()
  }

  private fun createPayload() = Arguments.createMap().apply {
    putInt(KEY, height)
  }

  companion object {
    private const val KEY = "softInputHeight"
  }
}
