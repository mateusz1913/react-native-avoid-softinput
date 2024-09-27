package com.reactnativeavoidsoftinput.animations

import android.animation.Animator
import android.animation.AnimatorListenerAdapter
import android.animation.ValueAnimator
import android.view.View
import android.widget.ScrollView
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.uimanager.PixelUtil
import com.reactnativeavoidsoftinput.convertFromPixelToDIP
import com.reactnativeavoidsoftinput.getViewDistanceToBottomEdge
import kotlin.math.max
import kotlin.math.min

class AnimationHandlerImpl : AnimationHandler {
    // MARK: variables
    private var avoidOffset: Float = 0F
    private var animationInterpolator = AnimationInterpolator()
    private var bottomOffset: Float = 0F
    private var hideAnimationDelay: Long = 0
    private var hideAnimationDuration: Long = DECREASE_PADDING_DURATION_IN_MS
    private var hideValueAnimator: ValueAnimator? = null
    private var initialScrollViewBottomPadding: Int = 0
    private var isHideAnimationCancelled: Boolean = false
    private var isHideAnimationRunning: Boolean = false
    private var isShowAnimationCancelled: Boolean = false
    private var isShowAnimationRunning: Boolean = false
    private var onOffsetChangedListener: ((offset: Int) -> Unit)? = null
    private var showAnimationDelay: Long = 0
    private var showAnimationDuration: Long = INCREASE_PADDING_DURATION_IN_MS
    private var showValueAnimator: ValueAnimator? = null

    // MARK: private methods
    private fun onOffsetChanged(offset: Int) {
        onOffsetChangedListener?.let { it(offset) }
    }

    private fun onRootViewAnimationUpdate(rootView: View, animatedOffset: Float) {
        onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
        rootView.translationY = -animatedOffset
    }

    private fun getScrollToOffset(
        softInputHeight: Int,
        scrollView: ScrollView,
        currentFocusedView: View
    ): Int {
        val scrollViewLocation = IntArray(2)
        scrollView.getLocationOnScreen(scrollViewLocation)

        val currentFocusedViewLocation = IntArray(2)
        currentFocusedView.getLocationOnScreen(currentFocusedViewLocation)
        val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(currentFocusedView)

        return min(
            max(softInputHeight - currentFocusedViewDistanceToBottom, 0),
            max(currentFocusedViewLocation[1] - scrollViewLocation[1], 0)
        )
    }

    private fun onScrollViewAnimationUpdate(scrollView: ScrollView, animatedOffset: Float) {
        onOffsetChanged(convertFromPixelToDIP(animatedOffset.toInt()))
        scrollView.setPadding(
            scrollView.paddingLeft,
            scrollView.paddingTop,
            scrollView.paddingRight,
            initialScrollViewBottomPadding + animatedOffset.toInt()
        )
    }

    private fun runAnimator(
        isShowAnimation: Boolean,
        animationStart: Float,
        animationEnd: Float,
        onAnimatorEventListener: OnAnimatorEventListener
    ) {
        UiThreadUtil.runOnUiThread {
            isHideAnimationCancelled = isShowAnimation
            isShowAnimationCancelled = !isShowAnimation
            if (isShowAnimation) {
                hideValueAnimator?.cancel()
            } else {
                showValueAnimator?.cancel()
            }
            onAnimatorEventListener.onBeforeStart()
            val animator =
                ValueAnimator.ofFloat(animationStart, animationEnd).apply {
                    duration = if (isShowAnimation) showAnimationDuration else hideAnimationDuration
                    startDelay = if (isShowAnimation) showAnimationDelay else hideAnimationDelay
                    interpolator = animationInterpolator
                    addListener(
                        object : AnimatorListenerAdapter() {
                            override fun onAnimationEnd(animation: Animator) {
                                super.onAnimationEnd(animation)
                                if (isShowAnimation) {
                                    isShowAnimationRunning = false
                                    showValueAnimator = null
                                    if (isShowAnimationCancelled) {
                                        onAnimatorEventListener.onCancel()
                                    } else {
                                        onAnimatorEventListener.onEnd()
                                    }
                                } else {
                                    isHideAnimationRunning = false
                                    hideValueAnimator = null
                                    if (isHideAnimationCancelled) {
                                        onAnimatorEventListener.onCancel()
                                    } else {
                                        onAnimatorEventListener.onEnd()
                                    }
                                }
                            }
                        }
                    )
                    addUpdateListener {
                        onAnimatorEventListener.onUpdate(it.animatedValue as Float)
                    }
                    start()
                }
            if (isShowAnimation) {
                showValueAnimator = animator
            } else {
                hideValueAnimator = animator
            }
        }
    }

    // MARK: public methods
    override fun decreaseOffsetInRootView(from: Int, to: Int, rootView: View) {
        isHideAnimationRunning = true

        val addedOffset = (to - from).toFloat()
        val newBottomOffset =
            if (isShowAnimationRunning) {
                bottomOffset
            } else {
                bottomOffset + addedOffset
            }

        runAnimator(
            false,
            bottomOffset,
            newBottomOffset,
            object : OnAnimatorEventListener {
                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
                    bottomOffset = newBottomOffset
                }

                override fun onUpdate(animatedValue: Float) {
                    onRootViewAnimationUpdate(rootView, animatedValue)
                }
            }
        )
    }

    override fun increaseOffsetInRootView(from: Int, to: Int, rootView: View) {
        isShowAnimationRunning = true

        val addedOffset = (to - from).toFloat()
        val newBottomOffset =
            if (isHideAnimationRunning) {
                bottomOffset
            } else {
                bottomOffset + addedOffset
            }

        runAnimator(
            true,
            bottomOffset,
            newBottomOffset,
            object : OnAnimatorEventListener {
                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
                    bottomOffset = newBottomOffset
                }

                override fun onUpdate(animatedValue: Float) {
                    onRootViewAnimationUpdate(rootView, animatedValue)
                }
            }
        )
    }

    override fun removeOffsetInRootView(rootView: View, onOffsetAnimationEnd: () -> Unit) {
        isHideAnimationRunning = true

        runAnimator(
            false,
            bottomOffset,
            0F,
            object : OnAnimatorEventListener {
                override fun onBeforeStart() {
                    onOffsetChanged(convertFromPixelToDIP(bottomOffset.toInt()))
                }

                override fun onEnd() {
                    onOffsetChanged(0)
                    bottomOffset = 0F
                    onOffsetAnimationEnd()
                }

                override fun onUpdate(animatedValue: Float) {
                    onRootViewAnimationUpdate(rootView, animatedValue)
                }
            }
        )
    }

    override fun addOffsetInRootView(
        to: Int,
        rootView: View,
        focusedView: View,
        onOffsetAnimationEnd: () -> Unit
    ) {
        isShowAnimationRunning = true
        val currentFocusedViewDistanceToBottom = getViewDistanceToBottomEdge(focusedView)

        bottomOffset = max(to - currentFocusedViewDistanceToBottom, 0).toFloat() + avoidOffset

        if (bottomOffset <= 0F) {
            return
        }

        runAnimator(
            true,
            0F,
            bottomOffset,
            object : OnAnimatorEventListener {
                override fun onBeforeStart() {
                    onOffsetChanged(convertFromPixelToDIP(0))
                }

                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(bottomOffset.toInt()))
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
        isHideAnimationRunning = true

        val addedOffset = (to - from).toFloat()
        val newBottomOffset =
            if (isShowAnimationRunning) {
                bottomOffset
            } else {
                bottomOffset + addedOffset
            }
        val scrollToOffset = getScrollToOffset(to, scrollView, focusedView)

        runAnimator(
            false,
            bottomOffset,
            newBottomOffset,
            object : OnAnimatorEventListener {
                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
                    scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
                    bottomOffset = newBottomOffset
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
        isShowAnimationRunning = true

        val addedOffset = (to - from).toFloat()
        val newBottomOffset =
            if (isHideAnimationRunning) {
                bottomOffset
            } else {
                bottomOffset + addedOffset
            }
        val scrollToOffset = getScrollToOffset(to, scrollView, currentFocusedView)

        runAnimator(
            true,
            bottomOffset,
            newBottomOffset,
            object : OnAnimatorEventListener {
                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(newBottomOffset.toInt()))
                    scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
                    bottomOffset = newBottomOffset
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
        isHideAnimationRunning = true

        runAnimator(
            false,
            bottomOffset,
            0F,
            object : OnAnimatorEventListener {
                override fun onBeforeStart() {
                    onOffsetChanged(convertFromPixelToDIP(bottomOffset.toInt()))
                }

                override fun onCancel() {
                    // In case remove animation is interrupted, we still need to "reset" applied
                    // padding
                    // when it is interrupted with add animation
                    //
                    // When increase animation interrupted, it will be overriden by updated padding
                    onScrollViewAnimationUpdate(scrollView, 0F)
                }

                override fun onEnd() {
                    onOffsetChanged(0)
                    initialScrollViewBottomPadding = 0
                    bottomOffset = 0F
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
        isShowAnimationRunning = true
        val scrollViewDistanceToBottom = getViewDistanceToBottomEdge(scrollView)

        bottomOffset = max(softInputHeight - scrollViewDistanceToBottom, 0).toFloat() + avoidOffset

        val scrollToOffset = getScrollToOffset(softInputHeight, scrollView, currentFocusedView)

        if (bottomOffset <= 0F) {
            return
        }

        runAnimator(
            true,
            0F,
            bottomOffset,
            object : OnAnimatorEventListener {
                override fun onBeforeStart() {
                    onOffsetChanged(convertFromPixelToDIP(0))
                    initialScrollViewBottomPadding = scrollView.paddingBottom
                }

                override fun onEnd() {
                    onOffsetChanged(convertFromPixelToDIP(bottomOffset.toInt()))
                    onOffsetAnimationEnd()
                    scrollView.smoothScrollTo(0, scrollView.scrollY + scrollToOffset)
                }

                override fun onUpdate(animatedValue: Float) {
                    onScrollViewAnimationUpdate(scrollView, animatedValue)
                }
            }
        )
    }

    override fun setAvoidOffset(offset: Float) {
        avoidOffset = PixelUtil.toPixelFromDIP(offset)
    }

    override fun setEasing(easing: String?) {
        animationInterpolator.mode =
            when (easing) {
                "easeIn" -> AnimationInterpolator.Companion.MODE.EASE_IN
                "easeInOut" -> AnimationInterpolator.Companion.MODE.EASE_IN_OUT
                "easeOut" -> AnimationInterpolator.Companion.MODE.EASE_OUT
                else -> AnimationInterpolator.Companion.MODE.LINEAR
            }
    }

    override fun setHideAnimationDelay(delay: Int?) {
        hideAnimationDelay = delay?.toLong() ?: 0
    }

    override fun setHideAnimationDuration(duration: Int?) {
        hideAnimationDuration = duration?.toLong() ?: DECREASE_PADDING_DURATION_IN_MS
    }

    override fun setOnOffsetChangedListener(listener: ((offset: Int) -> Unit)?) {
        onOffsetChangedListener = listener
    }

    override fun setShowAnimationDelay(delay: Int?) {
        showAnimationDelay = delay?.toLong() ?: 0
    }

    override fun setShowAnimationDuration(duration: Int?) {
        showAnimationDuration = duration?.toLong() ?: INCREASE_PADDING_DURATION_IN_MS
    }

    override fun clearOffsets() {
        bottomOffset = 0F
        initialScrollViewBottomPadding = 0
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
