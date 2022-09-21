package com.reactnativeavoidsoftinput.listeners

interface SoftInputListener {
  fun onSoftInputShown(from: Int, to: Int)
  fun onSoftInputHidden(from: Int, to: Int)
  fun onSoftInputHeightChange(from: Int, to: Int, isOrientationChanged: Boolean)
}
