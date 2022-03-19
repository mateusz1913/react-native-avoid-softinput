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
import com.facebook.react.uimanager.RootView
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
  private var mIsHideAnimationCancelled: Boolean = false
  private var mIsHideAnimationRunning: Boolean = false
  private var mIsShowAnimationCancelled: Boolean = false
  private var mIsShowAnimationRunning: Boolean = false
  private var mListener: ((offset: Int) -> Unit)? = null
  private var mPreviousFocusedView: View? = null
  private var mPreviousRootView: View? = null
  private var mScrollY: Int = 0
  private var mShouldCheckForAvoidSoftInputView = false
  private var mShowAnimationDelay: Long = 0
  private var mShowAnimationDuration: Long = INCREASE_PADDING_DURATION_IN_MS
  private var mShowValueAnimator: ValueAnimator? = null
  private var mSoftInputVisible: Boolean = false

  //MARK: Listeners
  private val mOnGlobalFocusChangeListener = ViewTreeObserver.OnGlobalFocusChangeListener { oldView, newView ->
    mCurrentFocusedView = newView
    mPreviousFocusedView = oldView

    if (!mSoftInputVisible || !mIsEnabled) {
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

  fun onSoftInputHeightChange(from: Int, to: Int, customRootView: View? = null) {
    mCompleteSoftInputHeight = to
    val currentFocusedView = mCurrentFocusedView ?: mPreviousFocusedView

    if (!mIsEnabled || currentFocusedView == null) {
      return
    }

    if (customRootView != null) {
      setOffset(from, to, currentFocusedView, customRootView)
    } else {
      val rootView = getReactRootView(currentFocusedView) ?: (mPreviousRootView as RootView)

      if (rootView !is View || (mShouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(currentFocusedView, rootView))) {
        return
      }

      setOffset(from, to, currentFocusedView, rootView)
    }
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
  private fun onOffsetChanged(offset: Int) {
    mListener?.let { it(offset) }
  }

  private fun setOffset(from: Int, to: Int, currentFocusedView: View, rootView: View) {
    val scrollView = getScrollViewParent(currentFocusedView, rootView)
    setScrollListener(scrollView, mOnScrollListener)

    if (scrollView != null) {
      setOffsetInScrollView(from, to, currentFocusedView, scrollView)
    } else {
      setOffsetInRootView(from, to, currentFocusedView, rootView)
    }
  }

  //MARK: set offset to root view
  private fun setOffsetInRootView(from: Int, to: Int, currentFocusedView: View, rootView: View) {
    if (to == from) {
      return
    }
    if (to == 0) {
      // HIDE
      removeOffsetInRootView(rootView)
    } else if (to - from > 0 && !mSoftInputVisible) {
      // SHOW
      addOffsetInRootView(to, rootView, currentFocusedView)
    } else if (to - from > 0) {
      // INCREASE
      increaseOffsetInRootView(from, to, rootView)
    } else if (to - from < 0) {
      // DECREASE
      decreaseOffsetInRootView(from, to, rootView)
    }
  }

  private fun decreaseOffsetInRootView(from: Int, to: Int, rootView: View) {
    mIsHideAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsShowAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }

    UiThreadUtil.runOnUiThread {
      mIsShowAnimationCancelled = true
      mIsHideAnimationCancelled = false
      mShowValueAnimator?.cancel()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, newBottomOffset).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsHideAnimationRunning = false
            mHideValueAnimator = null
            if (mIsHideAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
            mBottomOffset = newBottomOffset
          }
        })
        addUpdateListener {
          onRootViewAnimationUpdate(rootView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun increaseOffsetInRootView(from: Int, to: Int, rootView: View) {
    mIsShowAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsHideAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }

    UiThreadUtil.runOnUiThread {
      mIsHideAnimationCancelled = true
      mIsShowAnimationCancelled = false
      mHideValueAnimator?.cancel()
      mShowValueAnimator = ValueAnimator.ofFloat(mBottomOffset, newBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsShowAnimationRunning = false
            mShowValueAnimator = null
            if (mIsShowAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
            mBottomOffset = newBottomOffset
          }
        })
        addUpdateListener {
          onRootViewAnimationUpdate(rootView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun removeOffsetInRootView(rootView: View) {
    mIsHideAnimationRunning = true
    UiThreadUtil.runOnUiThread {
      mIsShowAnimationCancelled = true
      mIsHideAnimationCancelled = false
      onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
      mShowValueAnimator?.cancel()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsHideAnimationRunning = false
            mHideValueAnimator = null
            if (mIsHideAnimationCancelled) {
              return
            }
            onOffsetChanged(0)
            mBottomOffset = 0F
            mPreviousRootView = null
            mSoftInputVisible = false
          }
        })
        addUpdateListener {
          onRootViewAnimationUpdate(rootView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun addOffsetInRootView(softInputHeight: Int, rootView: View, currentFocusedView: View) {
    mIsShowAnimationRunning = true
    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (currentFocusedViewLocation[1] + currentFocusedView.height) - (getRootViewBottomInset(context) ?: 0)

    mBottomOffset = max(softInputHeight - currentFocusedViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    if (mBottomOffset <= 0F) {
      return
    }

    UiThreadUtil.runOnUiThread {
      mIsHideAnimationCancelled = true
      mIsShowAnimationCancelled = false
      onOffsetChanged(convertFromPixelToDIP(0))
      mHideValueAnimator?.cancel()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsShowAnimationRunning = false
            mShowValueAnimator = null
            if (mIsShowAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
            mPreviousRootView = rootView
            mSoftInputVisible = true
          }
        })
        addUpdateListener {
          onRootViewAnimationUpdate(rootView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun onRootViewAnimationUpdate(rootView: View, animatedOffset: Float) {
    onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
    rootView.translationY = -animatedOffset
  }

  //MARK: set offset to scroll view
  private fun setOffsetInScrollView(from: Int, to: Int, currentFocusedView: View, scrollView: ScrollView) {
    if (to == from) {
      return
    }
    if (to == 0) {
      // HIDE
      removeOffsetInScrollView(scrollView)
    } else if (to - from > 0 && !mSoftInputVisible) {
      // SHOW
      addOffsetInScrollView(to, scrollView, currentFocusedView)
    } else if (to - from > 0) {
      // INCREASE
      increaseOffsetInScrollView(from, to, scrollView, currentFocusedView)
    } else if (to - from < 0) {
      // DECREASE
      decreaseOffsetInScrollView(from, to, scrollView, currentFocusedView)
    }
  }

  private fun decreaseOffsetInScrollView(from: Int, to: Int, scrollView: ScrollView, currentFocusedView: View) {
    mIsHideAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsShowAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }
    val scrollToOffset = getScrollToOffset(to, scrollView, currentFocusedView)

    UiThreadUtil.runOnUiThread {
      mIsShowAnimationCancelled = true
      mIsHideAnimationCancelled = false
      mShowValueAnimator?.cancel()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, newBottomOffset).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsHideAnimationRunning = false
            mHideValueAnimator = null
            if (mIsHideAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
            scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
            mBottomOffset = newBottomOffset
          }
        })
        addUpdateListener {
          onScrollViewAnimationUpdate(scrollView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun increaseOffsetInScrollView(from: Int, to: Int, scrollView: ScrollView, currentFocusedView: View) {
    mIsShowAnimationRunning = true

    val addedOffset = (to - from).toFloat()
    val newBottomOffset = if (mIsHideAnimationRunning) {
      mBottomOffset
    } else {
      mBottomOffset + addedOffset
    }
    val scrollToOffset = getScrollToOffset(to, scrollView, currentFocusedView)

    UiThreadUtil.runOnUiThread {
      mIsHideAnimationCancelled = true
      mIsShowAnimationCancelled = false
      mHideValueAnimator?.cancel()
      mShowValueAnimator = ValueAnimator.ofFloat(mBottomOffset, newBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsShowAnimationRunning = false
            mShowValueAnimator = null
            if (mIsShowAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
            scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
            mBottomOffset = newBottomOffset
          }
        })
        addUpdateListener {
          onScrollViewAnimationUpdate(scrollView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun removeOffsetInScrollView(scrollView: ScrollView) {
    mIsHideAnimationRunning = true
    UiThreadUtil.runOnUiThread {
      mIsShowAnimationCancelled = true
      mIsHideAnimationCancelled = false
      onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
      mShowValueAnimator?.cancel()
      mHideValueAnimator = ValueAnimator.ofFloat(mBottomOffset, 0F).apply {
        duration = mHideAnimationDuration
        startDelay = mHideAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsHideAnimationRunning = false
            mHideValueAnimator = null
            if (mIsHideAnimationCancelled) {
              return
            }
            onOffsetChanged(0)
            scrollView.smoothScrollTo(0, mScrollY)
            mScrollY = 0
            mCurrentBottomPadding = 0
            mBottomOffset = 0F
            mSoftInputVisible = false
          }
        })
        addUpdateListener {
          onScrollViewAnimationUpdate(scrollView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun addOffsetInScrollView(softInputHeight: Int, scrollView: ScrollView, currentFocusedView: View) {
    mIsShowAnimationRunning = true
    val scrollViewLocation = IntArray(2)
    scrollView.getLocationOnScreen(scrollViewLocation)
    val scrollViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (scrollViewLocation[1] + scrollView.height) - (getRootViewBottomInset(context) ?: 0)

    mBottomOffset = max(softInputHeight - scrollViewDistanceToBottom, 0).toFloat() + mAvoidOffset

    val scrollToOffset = getScrollToOffset(softInputHeight, scrollView, currentFocusedView)

    if (mBottomOffset <= 0F) {
      return
    }

    mCurrentBottomPadding = scrollView.paddingBottom

    UiThreadUtil.runOnUiThread {
      mIsHideAnimationCancelled = true
      mIsShowAnimationCancelled = false
      onOffsetChanged(convertFromPixelToDIP(0))
      mHideValueAnimator?.cancel()
      mShowValueAnimator = ValueAnimator.ofFloat(0F, mBottomOffset).apply {
        duration = mShowAnimationDuration
        startDelay = mShowAnimationDelay
        interpolator = mAnimationInterpolator
        addListener(object: AnimatorListenerAdapter() {
          override fun onAnimationEnd(animation: Animator?) {
            super.onAnimationEnd(animation)
            mIsShowAnimationRunning = false
            mShowValueAnimator = null
            if (mIsShowAnimationCancelled) {
              return
            }
            onOffsetChanged(convertFromPixelToDIP(mBottomOffset.toInt()))
            mScrollY = scrollView.scrollY
            scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
            mSoftInputVisible = true
          }
        })
        addUpdateListener {
          onScrollViewAnimationUpdate(scrollView, it.animatedValue as Float)
        }
        start()
      }
    }
  }

  private fun getScrollToOffset(softInputHeight: Int, scrollView: ScrollView, currentFocusedView: View): Int {
    val scrollViewLocation = IntArray(2)
    scrollView.getLocationOnScreen(scrollViewLocation)

    val currentFocusedViewLocation = IntArray(2)
    currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
    val currentFocusedViewDistanceToBottom = DisplayMetricsHolder.getScreenDisplayMetrics().heightPixels - (currentFocusedViewLocation[1] + currentFocusedView.height) - (getRootViewBottomInset(context) ?: 0)

    return min(max(softInputHeight - currentFocusedViewDistanceToBottom, 0), (currentFocusedViewLocation[1] - scrollViewLocation[1]))
  }

  private fun onScrollViewAnimationUpdate(scrollView: ScrollView, animatedOffset: Float) {
    onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
    scrollView.setPadding(
      scrollView.paddingLeft,
      scrollView.paddingTop,
      scrollView.paddingRight,
      mCurrentBottomPadding + animatedOffset.toInt()
    )
  }

  companion object {
    const val INCREASE_PADDING_DURATION_IN_MS: Long = 660
    const val DECREASE_PADDING_DURATION_IN_MS: Long = 220
  }
}
