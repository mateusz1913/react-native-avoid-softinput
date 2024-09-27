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

class AvoidSoftInputManager(private val reactContext: ReactApplicationContext) :
    WindowInsetsListener by WindowInsetsListenerImpl(),
    FocusedViewChangeListener by FocusedViewChangeListenerImpl(),
    AnimationHandler by AnimationHandlerImpl() {
    // MARK: Variables
    private var completeSoftInputHeight = 0
    private var isEnabled = true
    private var isInitialized: Boolean = false
    private var onSoftInputEventsListener: SoftInputListener? = null
    private var previousRootView: View? = null
    private var previousScrollView: ScrollView? = null
    private var currentRootView: View? = null
    private var scrollY: Int = 0
    private var softInputVisible: Boolean = false

    private val isCustomRootView: Boolean
        get() {
            return currentRootView is AvoidSoftInputView
        }

    private val onSoftInputListener =
        object : SoftInputListener {
            override fun onSoftInputHeightChange(
                from: Int,
                to: Int,
                isOrientationChanged: Boolean
            ) {
                onSoftInputEventsListener?.onSoftInputHeightChange(from, to, isOrientationChanged)
                handleSoftInputHeightChange(from, to)
            }

            override fun onSoftInputHidden(from: Int, to: Int) {
                onSoftInputEventsListener?.onSoftInputHidden(from, to)
            }

            override fun onSoftInputShown(from: Int, to: Int) {
                onSoftInputEventsListener?.onSoftInputShown(from, to)
            }
        }

    // MARK: Private methods
    private fun onFocus(@Suppress("UNUSED_PARAMETER") oldView: View?, newView: View?) {
        if (!isEnabled) {
            return
        }
        val reactRootView = getNearestParentReactRootView(newView)
        if (reactRootView !is View || newView == null) {
            return
        }
        val scrollView = getScrollViewParent(newView, reactRootView) ?: return
        scrollY = scrollView.scrollY
        if (!softInputVisible) {
            return
        }

        setScrollListenerCompat(scrollView) {
            if (currentFocusedView != null) {
                scrollY = it
            }
        }
        val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(newView)

        val scrollToOffset = max(completeSoftInputHeight - currentFocusedViewDistanceToBottom, 0)

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
        if (isInitialized) {
            setSoftInputListener(null)
            currentRootView?.let { unregisterWindowInsetsListener(it) }
            setOnFocusListener(null)
            currentRootView?.let { unregisterFocusedViewChangeListener(it) }
            isInitialized = false
        }
    }

    fun initializeHandlers() {
        if (!isInitialized) {
            setSoftInputListener(onSoftInputListener)
            currentRootView?.let { registerWindowInsetsListener(it) }
            setOnFocusListener(::onFocus)
            currentRootView?.let { registerFocusedViewChangeListener(it) }
            isInitialized = true
        }
    }

    fun setRootView(view: View?) {
        currentRootView = view
    }

    fun setIsEnabled(enabled: Boolean) {
        isEnabled = enabled
    }

    fun setShouldMimicIOSBehavior(shouldMimic: Boolean) {
        setShouldHandleInsets(shouldMimic)
    }

    fun setOnSoftInputEventsListener(listener: SoftInputListener?) {
        onSoftInputEventsListener = listener
    }

    private fun handleSoftInputHeightChange(from: Int, to: Int) {
        completeSoftInputHeight = to
        val focusedView = currentFocusedView ?: previousFocusedView

        if (focusedView == null) {
            if (softInputVisible && to == 0) {
                // Handle case when padding was applied but focused view was unmounted,
                // or screen was dismissed from navigation stack and internal values were not reset
                clearOffsets()
                scrollY = 0
                previousRootView = null
                previousScrollView = null
                softInputVisible = false
            }
            return
        }

        if (isCustomRootView) {
            setOffset(from, to, focusedView, currentRootView!!)
        } else {
            val rootView =
                getNearestParentReactRootView(focusedView) ?: (previousRootView as RootView?)

            if (rootView !is View || checkIfNestedInAvoidSoftInputView(focusedView, rootView)) {
                return
            }

            setOffset(from, to, focusedView, rootView)
        }
    }

    private fun setOffset(from: Int, to: Int, focusedView: View, rootView: View) {
        val scrollView = getScrollViewParent(focusedView, rootView) ?: previousScrollView

        if (scrollView != null) {
            setScrollListenerCompat(scrollView) {
                if (currentFocusedView != null) {
                    scrollY = it
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
            // Run remove offset method no matter if manager is enabled (in case applied offset is
            // 0, it will be no-op)
            removeOffsetInRootView(rootView) {
                previousRootView = null
                softInputVisible = false
            }
        } else if (to - from > 0 && (!softInputVisible || from == 0)) {
            // SHOW
            if (!isEnabled) {
                return
            }
            addOffsetInRootView(to, rootView, focusedView) {
                previousRootView = rootView
                softInputVisible = true
            }
        } else if (to - from > 0) {
            // INCREASE
            if (!isEnabled) {
                return
            }
            increaseOffsetInRootView(from, to, rootView)
        } else if (to - from < 0) {
            // DECREASE
            if (!isEnabled) {
                return
            }
            decreaseOffsetInRootView(from, to, rootView)
        }
    }

    // MARK: set offset to scroll view
    private fun setOffsetInScrollView(
        from: Int,
        to: Int,
        focusedView: View,
        scrollView: ScrollView
    ) {
        // Don't need RESET case like on iOS, just ignore if values are the same
        if (to == from) {
            return
        }
        if (to == 0) {
            // HIDE
            // Run remove offset method no matter if manager is enabled (in case applied offset is
            // 0, it will be no-op)
            removeOffsetInScrollView(scrollView, scrollY) {
                scrollY = 0
                previousScrollView = null
                softInputVisible = false
            }
        } else if (to - from > 0 && (!softInputVisible || from == 0)) {
            // SHOW
            if (!isEnabled) {
                return
            }
            addOffsetInScrollView(to, scrollView, focusedView) {
                scrollY = scrollView.scrollY
                previousScrollView = scrollView
                softInputVisible = true
            }
        } else if (to - from > 0) {
            // INCREASE
            if (!isEnabled) {
                return
            }
            increaseOffsetInScrollView(from, to, scrollView, focusedView)
        } else if (to - from < 0) {
            // DECREASE
            if (!isEnabled) {
                return
            }
            decreaseOffsetInScrollView(from, to, scrollView, focusedView)
        }
    }
}
