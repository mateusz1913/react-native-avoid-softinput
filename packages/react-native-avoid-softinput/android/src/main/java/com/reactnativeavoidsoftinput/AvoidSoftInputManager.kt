package com.reactnativeavoidsoftinput

import android.view.View
import android.widget.ScrollView
import androidx.core.view.WindowCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.RootView
import com.reactnativeavoidsoftinput.animations.AnimationHandler
import com.reactnativeavoidsoftinput.animations.AnimationHandlerImpl
import com.reactnativeavoidsoftinput.listeners.FocusedViewChangeListener
import com.reactnativeavoidsoftinput.listeners.FocusedViewChangeListenerImpl
import com.reactnativeavoidsoftinput.listeners.SoftInputListener
import com.reactnativeavoidsoftinput.listeners.WindowInsetsListener
import com.reactnativeavoidsoftinput.listeners.WindowInsetsListenerImpl
import kotlin.math.max

class AvoidSoftInputManager(
  private val reactContext: ReactApplicationContext
) : WindowInsetsListener by WindowInsetsListenerImpl(),
  FocusedViewChangeListener by FocusedViewChangeListenerImpl(),
  AnimationHandler by AnimationHandlerImpl() {
  // MARK: Variables
  private var mCompleteSoftInputHeight = 0
  private var mIsEnabled = true
  private var mIsInitialized: Boolean = false
  private var mOnSoftInputEventsListener: SoftInputListener? = null
  private var mPreviousRootView: View? = null
  private var mPreviousScrollView: ScrollView? = null
  private var mRootView: View? = null
  private var mScrollY: Int = 0
  private var mSoftInputVisible: Boolean = false

  private val isCustomRootView: Boolean
    get() {
      return mRootView is AvoidSoftInputView
    }

  private val mOnSoftInputListener = object : SoftInputListener {
    override fun onSoftInputHeightChange(from: Int, to: Int, isOrientationChanged: Boolean) {
      mOnSoftInputEventsListener?.onSoftInputHeightChange(from, to, isOrientationChanged)
      handleSoftInputHeightChange(from, to)
    }

    override fun onSoftInputHidden(from: Int, to: Int) {
      mOnSoftInputEventsListener?.onSoftInputHidden(from, to)
    }

    override fun onSoftInputShown(from: Int, to: Int) {
      mOnSoftInputEventsListener?.onSoftInputShown(from, to)
    }
  }

  // MARK: Private methods
  private fun onFocus(oldView: View?, newView: View?) {
    if (!mSoftInputVisible || !mIsEnabled) {
      return
    }
    val reactRootView = getNearestParentReactRootView(newView)
    if (reactRootView !is View || newView == null) {
      return
    }
    val scrollView = getScrollViewParent(newView, reactRootView) ?: return
    setScrollListenerCompat(scrollView) {
      if (currentFocusedView != null) {
        mScrollY = it
      }
    }
    val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(newView)

    val scrollToOffset = max(mCompleteSoftInputHeight - currentFocusedViewDistanceToBottom, 0)

    mScrollY = scrollView.scrollY
    scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
  }

  private fun setShouldHandleInsets(shouldHandle: Boolean) {
    val activity = reactContext.currentActivity ?: return
    val decorFitsSystemWindows = !shouldHandle

    UiThreadUtil.runOnUiThread {
      WindowCompat.setDecorFitsSystemWindows(activity.window, decorFitsSystemWindows)
    }
  }

  // MARK: Public methods
  fun cleanupHandlers() {
    if (mIsInitialized) {
      setSoftInputListener(null)
      mRootView?.let { unregisterWindowInsetsListener(it) }
      setOnFocusListener(null)
      mRootView?.let { unregisterFocusedViewChangeListener(it) }
      mIsInitialized = false
    }
  }

  fun initializeHandlers() {
    if (!mIsInitialized) {
      setSoftInputListener(mOnSoftInputListener)
      mRootView?.let { registerWindowInsetsListener(it) }
      setOnFocusListener(::onFocus)
      mRootView?.let { registerFocusedViewChangeListener(it) }
      mIsInitialized = true
    }
  }

  fun setRootView(rootView: View?) {
    mRootView = rootView
  }

  fun setIsEnabled(isEnabled: Boolean) {
    mIsEnabled = isEnabled
  }

  fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
    setShouldHandleInsets(shouldMimic)
  }

  fun setOnSoftInputEventsListener(listener: SoftInputListener?) {
    mOnSoftInputEventsListener = listener
  }

  private fun handleSoftInputHeightChange(from: Int, to: Int) {
    mCompleteSoftInputHeight = to
    val focusedView = currentFocusedView ?: previousFocusedView

    if (focusedView == null) {
      if (mSoftInputVisible && to == 0) {
        // Handle case when padding was applied but focused view was unmounted,
        // or screen was dismissed from navigation stack and internal values were not reset
        clearOffsets()
        mScrollY = 0
        mPreviousRootView = null
        mPreviousScrollView = null
        mSoftInputVisible = false
      }
      return
    }

    if (isCustomRootView) {
      setOffset(from, to, focusedView, mRootView!!)
    } else {
      val rootView = getNearestParentReactRootView(focusedView) ?: (mPreviousRootView as RootView?)

      if (rootView !is View || checkIfNestedInAvoidSoftInputView(focusedView, rootView)) {
        return
      }

      setOffset(from, to, focusedView, rootView)
    }
  }

  private fun setOffset(from: Int, to: Int, focusedView: View, rootView: View) {
    val scrollView = getScrollViewParent(focusedView, rootView) ?: mPreviousScrollView

    if (scrollView != null) {
      setScrollListenerCompat(scrollView) {
        if (currentFocusedView != null) {
          mScrollY = it
        }
      }
      setOffsetInScrollView(from, to, focusedView, scrollView)
    } else {
      setOffsetInRootView(from, to, focusedView, rootView)
    }
  }

  // MARK: set offset to root view
  private fun setOffsetInRootView(from: Int, to: Int, focusedView: View, rootView: View) {
    // Don't need RESET case like on iOS, just ignore if values are the same
    if (to == from) {
      return
    }
    if (to == 0) {
      // HIDE
      // Run remove offset method no matter if manager is enabled (in case applied offset is 0, it will be no-op)
      removeOffsetInRootView(rootView) {
        mPreviousRootView = null
        mSoftInputVisible = false
      }
    } else if (to - from > 0 && (!mSoftInputVisible || from == 0)) {
      // SHOW
      if (!mIsEnabled) {
        return
      }
      addOffsetInRootView(to, rootView, focusedView) {
        mPreviousRootView = rootView
        mSoftInputVisible = true
      }
    } else if (to - from > 0) {
      // INCREASE
      if (!mIsEnabled) {
        return
      }
      increaseOffsetInRootView(from, to, rootView)
    } else if (to - from < 0) {
      // DECREASE
      if (!mIsEnabled) {
        return
      }
      decreaseOffsetInRootView(from, to, rootView)
    }
  }

  // MARK: set offset to scroll view
  private fun setOffsetInScrollView(from: Int, to: Int, focusedView: View, scrollView: ScrollView) {
    // Don't need RESET case like on iOS, just ignore if values are the same
    if (to == from) {
      return
    }
    if (to == 0) {
      // HIDE
      // Run remove offset method no matter if manager is enabled (in case applied offset is 0, it will be no-op)
      removeOffsetInScrollView(scrollView, mScrollY) {
        mScrollY = 0
        mPreviousScrollView = null
        mSoftInputVisible = false
      }
    } else if (to - from > 0 && (!mSoftInputVisible || from == 0)) {
      // SHOW
      if (!mIsEnabled) {
        return
      }
      addOffsetInScrollView(to, scrollView, focusedView) {
        mScrollY = scrollView.scrollY
        mPreviousScrollView = scrollView
        mSoftInputVisible = true
      }
    } else if (to - from > 0) {
      // INCREASE
      if (!mIsEnabled) {
        return
      }
      increaseOffsetInScrollView(from, to, scrollView, focusedView)
    } else if (to - from < 0) {
      // DECREASE
      if (!mIsEnabled) {
        return
      }
      decreaseOffsetInScrollView(from, to, scrollView, focusedView)
    }
  }
}
