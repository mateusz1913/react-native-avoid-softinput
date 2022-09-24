package com.reactnativeavoidsoftinput.animations

import android.view.View
import android.widget.ScrollView

interface AnimationHandler {
  fun decreaseOffsetInRootView(from: Int, to: Int, rootView: View)
  fun increaseOffsetInRootView(from: Int, to: Int, rootView: View)
  fun removeOffsetInRootView(rootView: View, onOffsetAnimationEnd: () -> Unit)
  fun addOffsetInRootView(
    to: Int,
    rootView: View,
    focusedView: View,
    onOffsetAnimationEnd: () -> Unit
  )
  fun decreaseOffsetInScrollView(from: Int, to: Int, scrollView: ScrollView, focusedView: View)
  fun increaseOffsetInScrollView(
    from: Int,
    to: Int,
    scrollView: ScrollView,
    currentFocusedView: View
  )
  fun removeOffsetInScrollView(
    scrollView: ScrollView,
    initialScrollValue: Int,
    onOffsetAnimationEnd: () -> Unit
  )
  fun addOffsetInScrollView(
    softInputHeight: Int,
    scrollView: ScrollView,
    currentFocusedView: View,
    onOffsetAnimationEnd: () -> Unit
  )
  fun setAvoidOffset(avoidOffset: Float)
  fun setEasing(easing: String?)
  fun setHideAnimationDelay(delay: Int?)
  fun setHideAnimationDuration(duration: Int?)
  fun setOnOffsetChangedListener(listener: ((offset: Int) -> Unit)?)
  fun setShowAnimationDelay(delay: Int?)
  fun setShowAnimationDuration(duration: Int?)
  fun clearOffsets()
}
