package com.reactnativeavoidsoftinput

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.view.View
import android.view.ViewTreeObserver
import android.widget.ScrollView
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.facebook.react.views.view.ReactViewGroup

class AvoidSoftInputView(private val reactContext: ThemedReactContext) : ReactViewGroup(reactContext), AvoidSoftInputProvider.SoftInputListener {
  private var mIsInitialized = false
  private var mAvoidSoftInputProvider: AvoidSoftInputProvider? = null
  private var mCurrentFocusedView: View? = null
  private var mPreviousFocusedView: View? = null
  private var mScrollViewParent: ScrollView? = null
  private var mIsViewSlideUp = false
  private var mIsViewSlidingDown = false
  private var mIsViewSlidingUp = false
  private var mCurrentBottomPadding: Int = 0
  private var mBottomOffset: Float = 0F
  private var mAvoidOffset: Float = 0F
  private var mScrollY: Int = 0
  private var mHideValueAnimator: ValueAnimator? = null
  private var mShowValueAnimator: ValueAnimator? = null

  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()
    initializeHandlers()
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    cleanupHandlers()
  }

  private fun initializeHandlers() {
    if (!mIsInitialized) {
      mAvoidSoftInputProvider = AvoidSoftInputProvider(reactContext, this).initializeProvider()
      mAvoidSoftInputProvider?.setSoftInputListener(this)
      this.viewTreeObserver?.addOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = true
    }
  }

  private fun cleanupHandlers() {
    if (mIsInitialized) {
      mAvoidSoftInputProvider?.dismiss()
      mAvoidSoftInputProvider?.setSoftInputListener(null)
      mAvoidSoftInputProvider = null
      this.viewTreeObserver?.removeOnGlobalFocusChangeListener(mOnGlobalFocusChangeListener)
      mIsInitialized = false
    }
  }

  fun setAvoidOffset(avoidOffset: Float) {
    mAvoidOffset = PixelUtil.toPixelFromDIP(avoidOffset)
  }

  override fun onSoftInputShown(from: Int, to: Int) {
    sendEvent(ON_SOFT_INPUT_SHOWN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, convertFromPixelToDIP(to))
    })

    val activity = reactContext.currentActivity ?: return
    val rootView = activity.window.decorView.rootView
    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView

    if (mIsViewSlideUp || mIsViewSlidingUp || currentFocusedView == null) {
      return
    }

    mIsViewSlidingUp = true

    val keyboardOffset = computeKeyboardOffset(to, currentFocusedView, this, rootView)

    if (keyboardOffset == null) {
      mIsViewSlidingUp = false
      return
    }

    mScrollViewParent = getScrollViewParent(currentFocusedView, this)

    mBottomOffset = keyboardOffset + mAvoidOffset
    val scrollViewParent = mScrollViewParent
    mCurrentBottomPadding = scrollViewParent?.paddingBottom ?: 0

    UiThreadUtil.runOnUiThread {
      mHideValueAnimator?.end()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = AvoidSoftInputModule.INCREASE_PADDING_DURATION_IN_MS
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
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
    sendEvent(ON_SOFT_INPUT_HIDDEN, Arguments.createMap().apply {
      putInt(SOFT_INPUT_HEIGHT_KEY, 0)
    })

    if ((!mIsViewSlideUp && !mIsViewSlidingUp) || mIsViewSlidingDown) {
      return
    }

    val scrollViewParent = mScrollViewParent

    UiThreadUtil.runOnUiThread {
      mShowValueAnimator?.end()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = AvoidSoftInputModule.DECREASE_PADDING_DURATION_IN_MS
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
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

  private fun sendEvent(eventName: String, params: WritableMap?) {
    reactContext.getJSModule(RCTEventEmitter::class.java).receiveEvent(this.id, eventName, params)
  }

  companion object {
    const val NAME = "AvoidSoftInputView"
    const val SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    const val ON_SOFT_INPUT_SHOWN = "onSoftInputShown"
    const val ON_SOFT_INPUT_HIDDEN = "onSoftInputHidden"
  }
}
