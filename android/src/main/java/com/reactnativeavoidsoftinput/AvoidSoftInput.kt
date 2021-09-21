package com.reactnativeavoidsoftinput

import android.animation.ValueAnimator
import android.view.View
import android.view.ViewTreeObserver
import android.widget.ScrollView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.PixelUtil

interface AvoidSoftInput {
  var mAnimationInterpolator: AvoidSoftInputInterpolator
  var mAvoidOffset: Float
  var mAvoidSoftInputProvider: AvoidSoftInputProvider?
  var mBottomOffset: Float
  var mCurrentBottomPadding: Int
  var mCurrentFocusedView: View?
  var mHideAnimationDelay: Long
  var mHideAnimationDuration: Long
  var mHideValueAnimator: ValueAnimator?
  var mIsInitialized: Boolean
  var mIsViewSlideUp: Boolean
  var mIsViewSlidingDown: Boolean
  var mIsViewSlidingUp: Boolean
  val mOnGlobalFocusChangeListener: ViewTreeObserver.OnGlobalFocusChangeListener
  var mPreviousFocusedView: View?
  var mScrollViewParent: ScrollView?
  var mScrollY: Int
  var mShowAnimationDelay: Long
  var mShowAnimationDuration: Long
  var mShowValueAnimator: ValueAnimator?

  fun cleanupHandlers(view: View?) {
    if (mIsInitialized) {
      mAvoidSoftInputProvider?.dismiss()
      mAvoidSoftInputProvider?.setSoftInputListener(null)
      mAvoidSoftInputProvider = null
      view?.viewTreeObserver?.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = false
    }
  }
  fun initializeHandlers(context: ReactContext, listener: AvoidSoftInputProvider.SoftInputListener, view: View?) {
    if (!mIsInitialized) {
      mAvoidSoftInputProvider = AvoidSoftInputProvider(context).initializeProvider()
      mAvoidSoftInputProvider?.setSoftInputListener(listener)
      view?.viewTreeObserver?.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = true
    }
  }

  fun setAvoidOffset(avoidOffset: Float) {
    mAvoidOffset = PixelUtil.toPixelFromDIP(avoidOffset)
  }

  fun setEasing(easing: String) {
    mAnimationInterpolator.mode = when (easing) {
      "easeIn" -> AvoidSoftInputInterpolator.Companion.MODE.EASE_IN
      "easeInOut" -> AvoidSoftInputInterpolator.Companion.MODE.EASE_IN_OUT
      "easeOut" -> AvoidSoftInputInterpolator.Companion.MODE.EASE_OUT
      else -> AvoidSoftInputInterpolator.Companion.MODE.LINEAR
    }
  }

  fun setHideAnimationDelay(delay: Int?) {
    mHideAnimationDelay = delay?.toLong() ?: 0
  }

  fun setHideAnimationDuration(duration: Int?) {
    mHideAnimationDuration = duration?.toLong() ?: AvoidSoftInputModule.DECREASE_PADDING_DURATION_IN_MS
  }

  fun setShowAnimationDelay(delay: Int?) {
    mShowAnimationDelay = delay?.toLong() ?: 0
  }

  fun setShowAnimationDuration(duration: Int?) {
    mShowAnimationDuration = duration?.toLong() ?: AvoidSoftInputModule.INCREASE_PADDING_DURATION_IN_MS
  }

  fun sendAppliedOffsetChangedEvent(offset: Int)
  fun sendHiddenEvent(height: Int)
  fun sendShownEvent(height: Int)
}
