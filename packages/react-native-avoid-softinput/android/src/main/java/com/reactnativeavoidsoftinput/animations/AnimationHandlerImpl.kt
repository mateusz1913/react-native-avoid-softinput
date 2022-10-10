package com.reactnativeavoidsoftinput.animations

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.view.View
import android.widget.ScrollView
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.PixelUtil
import com.reactnativeavoidsoftinput.AvoidSoftInputView
import com.reactnativeavoidsoftinput.convertFromPixelToDIP
import com.reactnativeavoidsoftinput.getRootViewBottomInset
import com.reactnativeavoidsoftinput.getViewDistanceToBottomEdge
import kotlin.math.max
import kotlin.math.min

class AnimationHandlerImpl : AnimationHandler {
  // MARK: variables
  private var mAvoidOffset: Float = 0F
  private var mAnimationInterpolator = AnimationInterpolator()
  private var mBottomOffset: Float = 0F
  private var mHideAnimationDelay: Long = 0
  private var mHideAnimationDuration: Long = DECREASE_PADDING_DURATION_IN_MS
  private var mHideValueAnimator: ValueAnimator? = null
  private var mInitialScrollViewBottomPadding: Int = 0
  private var mIsHideAnimationCancelled: Boolean = false
  private var mIsHideAnimationRunning: Boolean = false
  private var mIsShowAnimationCancelled: Boolean = false
  private var mIsShowAnimationRunning: Boolean = false
  private var mOnOffsetChangedListener: ((offset: Int) -> Unit)? = null
  private var mShowAnimationDelay: Long = 0
  private var mShowAnimationDuration: Long = INCREASE_PADDING_DURATION_IN_MS
  private var mShowValueAnimator: ValueAnimator? = null

  // MARK: private methods
  private fun onOffsetChanged(offset: Int) {
    mOnOffsetChangedListener?.let { it(offset) }
  }

  private fun onRootViewAnimationUpdate(rootView: View, animatedOffset: Float) {
    onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
    rootView.translationY = -animatedOffset
  }

  private fun getScrollToOffset(softInputHeight: Int, scrollView: ScrollView, currentFocusedView: View): Int {
    val scrollViewLocation = IntArray(2)
    scrollView.getLocationOnScreen(scrollViewLocation)

    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(scrollView)

    return min(max(softInputHeight - currentFocusedViewDistanceToBottom, 0), (currentFocusedViewLocation[1] - scrollViewLocation[1]))
  }

  private fun onScrollViewAnimationUpdate(scrollView: ScrollView, animatedOffset: Float) {
    onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
    scrollView.setPadding(
      scrollView.paddingLeft,
      scrollView.paddingTop,
      scrollView.paddingRight,
      mInitialScrollViewBottomPadding + animatedOffset.toInt()
    )
  }

  private fun runAnimator(
    isShowAnimation: Boolean,
    animationStart: Float,
    animationEnd: Float,
    onAnimatorEventListener: OnAnimatorEventListener
  ) {
    mIsHideAnimationCancelled = isShowAnimation
    mIsShowAnimationCancelled = !isShowAnimation
    if (isShowAnimation) {
      mHideValueAnimator?.cancel()
    } else {
      mShowValueAnimator?.cancel()
    }
    onAnimatorEventListener.onBeforeStart()
    UiThreadUtil.runOnUiThread {
      val animator = ValueAnimator.ofFloat(animationStart, animationEnd).apply {
        duration = if (isShowAnimation) mShowAnimationDuration else mHideAnimationDuration
        startDelay = if (isShowAnimation) mShowAnimationDelay else mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object : AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator) {
            super.onAnimationEnd(animation)
            if (isShowAnimation) {
              mIsShowAnimationRunning = false
              mShowValueAnimator = null
              if (mIsShowAnimationCancelled) {
                onAnimatorEventListener.onCancel()
              } else {
                onAnimatorEventListener.onEnd()
              }
            } else {
              mIsHideAnimationRunning = false
              mHideValueAnimator = null
              if (mIsHideAnimationCancelled) {
                onAnimatorEventListener.onCancel()
              } else {
                onAnimatorEventListener.onEnd()
              }
            }
          }
        })
        addUpdateListener {
          onAnimatorEventListener.onUpdate(it.animatedValue as Float)
        }
        start()
      }
      if (isShowAnimation) {
        mShowValueAnimator = animator
      } else {
        mHideValueAnimator = animator
      }
    }
  }

  // MARK: public methods
  override fun decreaseOffsetInRootView(from: Int, to: Int, rootView: View) {
    mIsHideAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsShowAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }

    runAnimator(
      false,
      mBottomOffset,
      newBottomOffset,
      object : OnAnimatorEventListener {
        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
          mBottomOffset = newBottomOffset
        }

        override fun onUpdate(animatedValue: Float) {
          onRootViewAnimationUpdate(rootView, animatedValue)
        }
      }
    )
  }

  override fun increaseOffsetInRootView(from: Int, to: Int, rootView: View) {
    mIsShowAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsHideAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }

    runAnimator(
      true,
      mBottomOffset,
      newBottomOffset,
      object : OnAnimatorEventListener {
        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
          mBottomOffset = newBottomOffset
        }

        override fun onUpdate(animatedValue: Float) {
          onRootViewAnimationUpdate(rootView, animatedValue)
        }
      }
    )
  }

  override fun removeOffsetInRootView(rootView: View, onOffsetAnimationEnd: () -> Unit) {
    mIsHideAnimationRunning = true

    runAnimator(
      false,
      mBottomOffset,
      0F,
      object : OnAnimatorEventListener {
        override fun onBeforeStart() {
          onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
        }

        override fun onEnd() {
          onOffsetChanged(0)
          mBottomOffset = 0F
          onOffsetAnimationEnd()
        }

        override fun onUpdate(animatedValue: Float) {
          onRootViewAnimationUpdate(rootView, animatedValue)
        }
      }
    )
  }

  override fun addOffsetInRootView(to: Int, rootView: View, focusedView: View, onOffsetAnimationEnd: () -> Unit) {
    mIsShowAnimationRunning = true
    val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(focusedView)

    mBottomOffset = max(to - currentFocusedViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    if (rootView !is AvoidSoftInputView) {
      mBottomOffset += getRootViewBottomInset(focusedView)
    }

    if (mBottomOffset <= 0F) {
      return
    }

    runAnimator(
      true,
      0F,
      mBottomOffset,
      object : OnAnimatorEventListener {
        override fun onBeforeStart() {
          onOffsetChanged(convertFromPixelToDIP(0))
        }

        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
          onOffsetAnimationEnd()
        }

        override fun onUpdate(animatedValue: Float) {
          onRootViewAnimationUpdate(rootView, animatedValue)
        }
      }
    )
  }

  override fun decreaseOffsetInScrollView(
    from: Int,
    to: Int,
    scrollView: ScrollView,
    focusedView: View
  ) {
    mIsHideAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsShowAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }
    val scrollToOffset = getScrollToOffset(to, scrollView, focusedView)

    runAnimator(
      false,
      mBottomOffset,
      newBottomOffset,
      object : OnAnimatorEventListener {
        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
          scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
          mBottomOffset = newBottomOffset
        }

        override fun onUpdate(animatedValue: Float) {
          onScrollViewAnimationUpdate(scrollView, animatedValue)
        }
      }
    )
  }

  override fun increaseOffsetInScrollView(
    from: Int,
    to: Int,
    scrollView: ScrollView,
    currentFocusedView: View
  ) {
    mIsShowAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsHideAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }
    val scrollToOffset = getScrollToOffset(to, scrollView, currentFocusedView)

    runAnimator(
      true,
      mBottomOffset,
      newBottomOffset,
      object : OnAnimatorEventListener {
        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
          scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
          mBottomOffset = newBottomOffset
        }

        override fun onUpdate(animatedValue: Float) {
          onScrollViewAnimationUpdate(scrollView, animatedValue)
        }
      }
    )
  }

  override fun removeOffsetInScrollView(
    scrollView: ScrollView,
    initialScrollValue: Int,
    onOffsetAnimationEnd: () -> Unit
  ) {
    mIsHideAnimationRunning = true

    runAnimator(
      false,
      mBottomOffset,
      0F,
      object : OnAnimatorEventListener {
        override fun onBeforeStart() {
          onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
        }

        override fun onCancel() {
          // In case remove animation is interrupted, we still need to "reset" applied padding
          // when it is interrupted with add animation
          //
          // When increase animation interrupted, it will be overriden by updated padding
          onScrollViewAnimationUpdate(scrollView, 0F)
        }

        override fun onEnd() {
          onOffsetChanged(0)
          mInitialScrollViewBottomPadding = 0
          mBottomOffset = 0F
          scrollView.smoothScrollTo(0, initialScrollValue)
          onOffsetAnimationEnd()
        }

        override fun onUpdate(animatedValue: Float) {
          onScrollViewAnimationUpdate(scrollView, animatedValue)
        }
      }
    )
  }

  override fun addOffsetInScrollView(
    softInputHeight: Int,
    scrollView: ScrollView,
    currentFocusedView: View,
    onOffsetAnimationEnd: () -> Unit
  ) {
    mIsShowAnimationRunning = true
    val scrollViewDistanceToBottom = getViewDistanceToBottomEdge(scrollView)

    mBottomOffset = max(softInputHeight - scrollViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    val scrollToOffset = getScrollToOffset(softInputHeight, scrollView, currentFocusedView)

    if (mBottomOffset <= 0F) {
      return
    }

    runAnimator(
      true,
      0F,
      mBottomOffset,
      object : OnAnimatorEventListener {
        override fun onBeforeStart() {
          onOffsetChanged(convertFromPixelToDIP(0))
          mInitialScrollViewBottomPadding = scrollView.paddingBottom
        }

        override fun onEnd() {
          onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
          onOffsetAnimationEnd()
          scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
        }

        override fun onUpdate(animatedValue: Float) {
          onScrollViewAnimationUpdate(scrollView, animatedValue)
        }
      }
    )
  }

  override fun setAvoidOffset(avoidOffset: Float) {
    mAvoidOffset = PixelUtil.toPixelFromDIP(avoidOffset)
  }

  override fun setEasing(easing: String?) {
    mAnimationInterpolator.mode = when (easing) {
      "easeIn" -> AnimationInterpolator.Companion.MODE.EASE_IN
      "easeInOut" -> AnimationInterpolator.Companion.MODE.EASE_IN_OUT
      "easeOut" -> AnimationInterpolator.Companion.MODE.EASE_OUT
      else -> AnimationInterpolator.Companion.MODE.LINEAR
    }
  }

  override fun setHideAnimationDelay(delay: Int?) {
    mHideAnimationDelay = delay?.toLong() ?: 0
  }

  override fun setHideAnimationDuration(duration: Int?) {
    mHideAnimationDuration = duration?.toLong() ?: DECREASE_PADDING_DURATION_IN_MS
  }

  override fun setOnOffsetChangedListener(listener: ((offset: Int) -> Unit)?) {
    mOnOffsetChangedListener = listener
  }

  override fun setShowAnimationDelay(delay: Int?) {
    mShowAnimationDelay = delay?.toLong() ?: 0
  }

  override fun setShowAnimationDuration(duration: Int?) {
    mShowAnimationDuration = duration?.toLong() ?: INCREASE_PADDING_DURATION_IN_MS
  }

  override fun clearOffsets() {
    mBottomOffset = 0F
    mInitialScrollViewBottomPadding = 0
  }

  private interface OnAnimatorEventListener {
    fun onBeforeStart() {}
    fun onCancel() {}
    fun onEnd() {}
    fun onUpdate(animatedValue: Float) {}
  }

  companion object {
    private const val INCREASE_PADDING_DURATION_IN_MS: Long = 660
    private const val DECREASE_PADDING_DURATION_IN_MS: Long = 220
  }
}
