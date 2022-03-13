package com.reactnativeavoidsoftinput

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.os.Build
import android.view.View
import android.view.ViewTreeObserver
import android.widget.ScrollView
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.DisplayMetricsHolder
import com.facebook.react.uimanager.PixelUtil
import kotlin.math.max
import kotlin.math.min

class AvoidSoftInputManager(private val context: ReactContext) {
  private var mAnimationInterpolator = AvoidSoftInputInterpolator()
  private var mAvoidOffset: Float = 0F
  private var mAvoidSoftInputProvider: AvoidSoftInputProvider? = null
  private var mBottomOffset: Float = 0F
  private var mCompleteSoftInputHeight = 0
  private var mCurrentBottomPadding: Int = 0
  private var mCurrentFocusedView: View? = null
  private var mHideAnimationDelay: Long = 0
  private var mHideAnimationDuration: Long = DECREASE_PADDING_DURATION_IN_MS
  private var mHideValueAnimator: ValueAnimator? = null
  private var mIsEnabled = true
  private var mIsInitialized: Boolean = false
  private var mIsViewSlideUp: Boolean = false
  private var mIsViewSlidingDown: Boolean = false
  private var mIsViewSlidingUp: Boolean = false
  private var mListener: ((offset: Int) -> Unit)? = null
  private var mPreviousFocusedView: View? = null
  private var mScrollY: Int = 0
  private var mShouldCheckForAvoidSoftInputView = false
  private var mShowAnimationDelay: Long = 0
  private var mShowAnimationDuration: Long = INCREASE_PADDING_DURATION_IN_MS
  private var mShowValueAnimator: ValueAnimator? = null

  //MARK: Listeners
  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView

    if (!mIsViewSlideUp || !mIsEnabled) {
      return@OnGlobalFocusChangeListener
    }
    val currentFocusedView = mCurrentFocusedView
    val rootView = getReactRootView(currentFocusedView)
    if (rootView !is View || currentFocusedView == null) {
      return@OnGlobalFocusChangeListener
    }
    val scrollView = getScrollViewParent(currentFocusedView, rootView) ?: return@OnGlobalFocusChangeListener
    setScrollListener(scrollView, mOnScrollListener)
    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (currentFocusedViewLocation[1] + currentFocusedView.height) - (getRootViewBottomInset(context) ?: 0)

    val scrollToOffset = max(mCompleteSoftInputHeight - currentFocusedViewDistanceToBottom, 0)

    mScrollY = scrollView.scrollY
    scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
  }

  private val mOnScrollListener = View.OnScrollChangeListener { _, _, scrollY, _, _ ->
    if (mCurrentFocusedView == null) {
      return@OnScrollChangeListener
    }
    mScrollY = scrollY
  }

  private fun setScrollListener(scrollView: ScrollView?, listener: View.OnScrollChangeListener?) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      scrollView?.setOnScrollChangeListener(listener)
    }
  }

  //MARK: Public methods
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

  fun onSoftInputShown(height: Int, customRootView: View? = null) {
    mCompleteSoftInputHeight = height

    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView
    val rootView = getReactRootView(currentFocusedView)

    if (mIsViewSlideUp || mIsViewSlidingUp || !mIsEnabled || currentFocusedView == null) {
      return
    }

    if (customRootView == null) {
      if (rootView !is View || (mShouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView))) {
        return
      }

      applyOffset(height, currentFocusedView, rootView)
      return
    }

    applyOffset(height, currentFocusedView, customRootView)
  }

  fun onSoftInputHidden(customRootView: View? = null) {
    mCompleteSoftInputHeight = 0

    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView
    val rootView = getReactRootView(currentFocusedView)

    if ((!mIsViewSlideUp && !mIsViewSlidingUp) || mIsViewSlidingDown || !mIsEnabled || currentFocusedView == null) {
      return
    }

    if (customRootView == null) {
      if (rootView !is View || (mShouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView))) {
        return
      }

      removeOffset(currentFocusedView, rootView)
      return
    }

    removeOffset(currentFocusedView, customRootView)
  }

  fun setIsEnabled(isEnabled: Boolean) {
    mIsEnabled = isEnabled
  }

  fun setOnOffsetChangedListener(listener: (offset: Int) -> Unit) {
    mListener = listener
  }

  fun setShouldCheckForAvoidSoftInputView(shouldCheck: Boolean) {
    mShouldCheckForAvoidSoftInputView = shouldCheck
  }

  //MARK: Props
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
    mHideAnimationDuration = duration?.toLong() ?: DECREASE_PADDING_DURATION_IN_MS
  }

  fun setShowAnimationDelay(delay: Int?) {
    mShowAnimationDelay = delay?.toLong() ?: 0
  }

  fun setShowAnimationDuration(duration: Int?) {
    mShowAnimationDuration = duration?.toLong() ?: INCREASE_PADDING_DURATION_IN_MS
  }

  //MARK: Private methods
  private fun applyOffset(softInputHeight: Int, currentFocusedView: View, rootView: View) {
    mIsViewSlidingUp = true

    val scrollView = getScrollViewParent(currentFocusedView, rootView)
    setScrollListener(scrollView, mOnScrollListener)

    if (scrollView != null) {
      applyOffsetToScrollView(softInputHeight, currentFocusedView, scrollView)
    } else {
      applyOffsetToRootView(softInputHeight, currentFocusedView, rootView)
    }
  }

  private fun applyOffsetToRootView(softInputHeight: Int, currentFocusedView: View, rootView: View) {
    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (currentFocusedViewLocation[1] + currentFocusedView.height) - (getRootViewBottomInset(context) ?: 0)

    mBottomOffset = max(softInputHeight - currentFocusedViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    if (mBottomOffset <= 0F) {
      mIsViewSlidingUp = false
      return
    }

    UiThreadUtil.runOnUiThread {
      mHideValueAnimator?.end()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            onOffsetChanged(convertFromPixelToDIP(0))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
            mIsViewSlidingUp = false
            mIsViewSlideUp = true
            mShowValueAnimator = null
          }
        })
        addUpdateListener {
          val animatedOffset = it.animatedValue as Float
          onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
          rootView.translationY = -animatedOffset
        }
        start()
      }
    }
  }

  private fun applyOffsetToScrollView(softInputHeight: Int, currentFocusedView: View, scrollView: ScrollView) {
    val scrollViewLocation = IntArray(2)
    scrollView.getLocationOnScreen(scrollViewLocation)
    val scrollViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (scrollViewLocation[1] + scrollView.height) - (getRootViewBottomInset(context) ?: 0)

    mBottomOffset = max(softInputHeight - scrollViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (currentFocusedViewLocation[1] + currentFocusedView.height) - (getRootViewBottomInset(context) ?: 0)

    val scrollToOffset = min(max(softInputHeight - currentFocusedViewDistanceToBottom, 0), (currentFocusedViewLocation[1] - scrollViewLocation[1]))

    if (mBottomOffset <= 0F) {
      mIsViewSlidingUp = false
      return
    }

    mCurrentBottomPadding = scrollView.paddingBottom

    UiThreadUtil.runOnUiThread {
      mHideValueAnimator?.end()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            onOffsetChanged(convertFromPixelToDIP(0))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
            mScrollY = scrollView.scrollY
            scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
            mIsViewSlidingUp = false
            mIsViewSlideUp = true
            mShowValueAnimator = null
          }
        })
        addUpdateListener {
          val animatedOffset = it.animatedValue as Float
          onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
          scrollView.setPadding(
            scrollView.paddingLeft,
            scrollView.paddingTop,
            scrollView.paddingRight,
            mCurrentBottomPadding + (it.animatedValue as Float).toInt()
          )
        }
        start()
      }
    }
  }

  private fun removeOffset(currentFocusedView: View, rootView: View) {
    mIsViewSlidingDown = true

    val scrollView = getScrollViewParent(currentFocusedView, rootView)
    setScrollListener(scrollView, null)

    if (scrollView != null) {
      removeOffsetFromScrollView(scrollView)
    } else {
      removeOffsetFromRootView(rootView)
    }
  }

  private fun removeOffsetFromRootView(rootView: View) {
    UiThreadUtil.runOnUiThread {
      mShowValueAnimator?.end()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            onOffsetChanged(0)
            mCurrentBottomPadding = 0
            mIsViewSlidingDown = false
            mIsViewSlideUp = false
            mHideValueAnimator = null
          }
        })
        addUpdateListener {
          val animatedOffset = it.animatedValue as Float
          onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
          rootView.translationY = -animatedOffset
        }
        start()
      }
    }
  }

  private fun removeOffsetFromScrollView(scrollView: ScrollView) {
    UiThreadUtil.runOnUiThread {
      mShowValueAnimator?.end()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationStart(animation: Animator?) {
            super.onAnimationStart(animation)
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
          }
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            onOffsetChanged(0)
            scrollView.smoothScrollTo(0, mScrollY)
            mScrollY = 0
            mCurrentBottomPadding = 0
            mIsViewSlidingDown = false
            mIsViewSlideUp = false
            mHideValueAnimator = null
          }
        })
        addUpdateListener {
          val animatedOffset = it.animatedValue as Float
          onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
          scrollView.setPadding(
            scrollView.paddingLeft,
            scrollView.paddingTop,
            scrollView.paddingRight,
            mCurrentBottomPadding + animatedOffset.toInt()
          )
        }
        start()
      }
    }
  }

  private fun onOffsetChanged(offset: Int) {
    mListener?.let { it(offset) }
  }

  companion object {
    const val INCREASE_PADDING_DURATION_IN_MS: Long = 660
    const val DECREASE_PADDING_DURATION_IN_MS: Long = 220
  }
}
