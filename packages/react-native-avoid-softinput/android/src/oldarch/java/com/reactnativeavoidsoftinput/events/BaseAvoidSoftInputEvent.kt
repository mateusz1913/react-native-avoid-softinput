package com.reactnativeavoidsoftinput.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

abstract class BaseAvoidSoftInputEvent(
  // available from RN 0.65
  surfaceId: Int,
  viewId: Int,
  private val height: Int
) : Event<BaseAvoidSoftInputEvent>(surfaceId, viewId) {
  // available from RN 0.65
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
