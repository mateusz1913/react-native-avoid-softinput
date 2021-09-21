package com.reactnativeavoidsoftinput

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.view.View
import android.view.ViewTreeObserver
import android.widget.ScrollView
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerModule
import com.facebook.react.views.view.ReactViewGroup
import com.reactnativeavoidsoftinput.events.AvoidSoftInputAppliedOffsetChangedEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputHiddenEvent
import com.reactnativeavoidsoftinput.events.AvoidSoftInputShownEvent

class AvoidSoftInputView(
  private val reactContext: ThemedReactContext
) : ReactViewGroup(reactContext), AvoidSoftInputProvider.SoftInputListener, AvoidSoftInput {
  override var mAnimationInterpolator = AvoidSoftInputInterpolator()
  override var mAvoidOffset: Float = 0F
  override var mAvoidSoftInputProvider: AvoidSoftInputProvider? = null
  override var mBottomOffset: Float = 0F
  override var mCurrentBottomPadding: Int = 0
  override var mCurrentFocusedView: View? = null
  override var mHideValueAnimator: ValueAnimator? = null
  override var mHideAnimationDelay: Long = 0
  override var mHideAnimationDuration = AvoidSoftInputModule.DECREASE_PADDING_DURATION_IN_MS
  override var mIsInitialized = false
  override var mIsViewSlideUp = false
  override var mIsViewSlidingDown = false
  override var mIsViewSlidingUp = false
  override var mPreviousFocusedView: View? = null
  override var mScrollViewParent: ScrollView? = null
  override var mScrollY: Int = 0
  override var mShowAnimationDelay: Long = 0
  override var mShowAnimationDuration = AvoidSoftInputModule.INCREASE_PADDING_DURATION_IN_MS
  override var mShowValueAnimator: ValueAnimator? = null

  override val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView
  }

  private fun getEventDispatcher() = reactContext.getNativeModule(UIManagerModule::class.java)?.eventDispatcher

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    initializeHandlers(reactContext, this, this)
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    cleanupHandlers(this)
  }

  override fun onSoftInputShown(from: Int, to: Int) {
    sendShownEvent(convertFromPixelToDIP(to))

    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView
    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView

    if (mIsViewSlideUp || mIsViewSlidingUp || currentFocusedView == null) {
      return
    }

    mIsViewSlidingUp = true

    val softInputOffset = computeSoftInputOffset(to, currentFocusedView, rootView)
    if (softInputOffset == null) {
      mIsViewSlidingUp = false
      return
    }

    mScrollViewParent = getScrollViewParent(currentFocusedView, this)

    mBottomOffset = softInputOffset + mAvoidOffset
    val scrollViewParent = mScrollViewParent
    mCurrentBottomPadding = scrollViewParent?.paddingBottom ?: 0

    UiThreadUtil.runOnUiThread {
      mHideValueAnimator?.end()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(0))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(mBottomOffset.toInt()))

            if (scrollViewParent != null) {
              mScrollY = scrollViewParent.scrollY
              scrollViewParent.smoothScrollTo(0, (scrollViewParent.scrollY + mBottomOffset).toInt())
            }
            mIsViewSlidingUp = false
            mIsViewSlideUp = true
            mShowValueAnimator = null
          }
        })
        addUpdateListener {
          sendAppliedOffsetChangedEvent(convertFromPixelToDIP((it.animatedValue as Float).toInt()))

          if (scrollViewParent != null) {
            scrollViewParent.setPadding(
              scrollViewParent.paddingLeft,
              scrollViewParent.paddingTop,
              scrollViewParent.paddingRight,
              mCurrentBottomPadding + (it.animatedValue as Float).toInt()
            )
          } else {
            this@AvoidSoftInputView.translationY = -(it.animatedValue as Float)
          }
        }
        start()
      }
    }
  }

  override fun onSoftInputHidden(from: Int, to: Int) {
    sendHiddenEvent(convertFromPixelToDIP(0))

    if ((!mIsViewSlideUp && !mIsViewSlidingUp) || mIsViewSlidingDown) {
      return
    }

    val scrollViewParent = mScrollViewParent

    UiThreadUtil.runOnUiThread {
      mShowValueAnimator?.end()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            sendAppliedOffsetChangedEvent(convertFromPixelToDIP(mBottomOffset.toInt()))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            sendAppliedOffsetChangedEvent(0)
            if (scrollViewParent != null) {
              scrollViewParent.smoothScrollTo(0, mScrollY)
              mScrollY = 0
            }
            mScrollViewParent = null
            mCurrentBottomPadding = 0
            mIsViewSlidingDown = false
            mIsViewSlideUp = false
            mHideValueAnimator = null
          }
        })
        addUpdateListener {
          sendAppliedOffsetChangedEvent(convertFromPixelToDIP((it.animatedValue as Float).toInt()))
          if (scrollViewParent != null) {
            scrollViewParent.setPadding(
              scrollViewParent.paddingLeft,
              scrollViewParent.paddingTop,
              scrollViewParent.paddingRight,
              mCurrentBottomPadding + (it.animatedValue as Float).toInt()
            )
          } else {
            this@AvoidSoftInputView.translationY = -(it.animatedValue as Float)
          }
        }
        start()
      }
    }
  }

  override fun sendAppliedOffsetChangedEvent(offset: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputAppliedOffsetChangedEvent(this.id, offset))
  }

  override fun sendHiddenEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputHiddenEvent(this.id, height))
  }

  override fun sendShownEvent(height: Int) {
    getEventDispatcher()?.dispatchEvent(AvoidSoftInputShownEvent(this.id, height))
  }

  companion object {
    const val NAME = "AvoidSoftInputView"
    const val ON_SOFT_INPUT_APPLIED_OFFSET_CHANGED = "onSoftInputAppliedOffsetChange"
    const val ON_SOFT_INPUT_HIDDEN = "onSoftInputHidden"
    const val ON_SOFT_INPUT_SHOWN = "onSoftInputShown"
  }
}
