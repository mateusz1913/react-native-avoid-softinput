import UIKit

public protocol AvoidSoftInputAnimationHandlerDelegate: AnyObject {
    func onOffsetChanged(_ offset: CGFloat)
}

public class AvoidSoftInputAnimationHandler: AvoidSoftInputAnimatorDelegate {
    public weak var delegate: AvoidSoftInputAnimationHandlerDelegate?

    public weak var customView: UIView?

    public var avoidOffset: CGFloat = 0
    public var easingOption: UIView.AnimationOptions = .curveLinear
    public var hideDelay: Double = AvoidSoftInputConstants.hideAnimationDelayInSeconds
    public var hideDuration: Double = AvoidSoftInputConstants.hideAnimationDurationInSeconds
    public var isEnabled: Bool = false
    public var showDelay: Double = AvoidSoftInputConstants.showAnimationDelayInSeconds
    public var showDuration: Double = AvoidSoftInputConstants.showAnimationDurationInSeconds

    #if os(iOS)
        private var hideAnimator = AvoidSoftInputAnimator()
        private var showAnimator = AvoidSoftInputAnimator()

        private var bottomOffset: CGFloat = 0
        private var lastFocusedView: UIView?
        private var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
        private var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
        private var softInputVisible: Bool = false
        private var wasAddOffsetInRootViewAborted = false
        private var wasAddOffsetInScrollViewAborted = false

        private var isCustomRootView: Bool {
            return customView is AvoidSoftInputView
        }
    #endif

    public init() {
        #if os(iOS)
            hideAnimator.delegate = self
            showAnimator.delegate = self
        #endif
    }

    public func onOffsetChanged(_ offset: CGFloat) {
        delegate?.onOffsetChanged(offset)
    }

    public func startAnimation(
        from: CGFloat,
        to: CGFloat,
        withOrientationChange isOrientationChange: Bool
    ) {
        guard let rootView = customView ?? AvoidSoftInputObjCPPUtils.getReactRootView() else {
            return
        }

        guard let firstResponder = rootView.findFirstResponder() ?? lastFocusedView else {
            return
        }

        lastFocusedView = firstResponder

        ///
        /// If this root view is _not_ a AvoidSoftInputView, and the firstResponder is inside AvoidSoftInputView,
        /// the animation will take place in AvoidSoftInputView's animation handler instance
        ///
        let shouldSkipSettingOffset = !isCustomRootView && firstResponder.checkIfNestedInAvoidSoftInputView()
        if shouldSkipSettingOffset {
            return
        }

        #if os(iOS)
            setOffset(
                from: from,
                to: to,
                isOrientationChange: isOrientationChange,
                firstResponder: firstResponder,
                rootView: rootView
            )
        #endif
    }

    #if os(iOS)
        private func runAnimator(
            withDuration duration: Double,
            delay: Double,
            easing: UIView.AnimationOptions,
            onStart: @escaping () -> Void,
            onAnimate: @escaping () -> Void,
            onComplete: @escaping () -> Void
        ) {
            onStart()
            UIView.animate(
                withDuration: duration,
                delay: delay,
                options: [.beginFromCurrentState, easing],
                animations: {
                    onAnimate()
                },
                completion: { _ in
                    onComplete()
                }
            )
        }

        private func setOffset(
            from: CGFloat,
            to: CGFloat,
            isOrientationChange: Bool,
            firstResponder: UIView,
            rootView: UIView
        ) {
            if let scrollView = firstResponder.findScrollViewForFirstResponderInRootView(rootView) {
                setOffsetInScrollView(
                    from: from,
                    to: to,
                    isOrientationChange: isOrientationChange,
                    firstResponder: firstResponder,
                    scrollView: scrollView,
                    rootView: rootView
                )
            } else {
                setOffsetInRootView(
                    from: from,
                    to: to,
                    isOrientationChange: isOrientationChange,
                    firstResponder: firstResponder,
                    rootView: rootView
                )
            }
        }

        private func setOffsetInRootView(
            from: CGFloat,
            to: CGFloat,
            isOrientationChange: Bool,
            firstResponder: UIView,
            rootView: UIView
        ) {
            if softInputVisible, isOrientationChange {
                // RESET
                addOffsetInRootView(to, firstResponder: firstResponder, rootView: rootView)
                return
            }
            if to == from {
                return
            }
            if to == 0 {
                // HIDE
                // Run remove offset method no matter if it is enabled (in case applied offset is 0, it will be no-op)
                removeOffsetInRootView(rootView: rootView)
            } else if to - from > 0, !softInputVisible || from == 0 {
                // SHOW
                if !isEnabled {
                    return
                }
                addOffsetInRootView(to, firstResponder: firstResponder, rootView: rootView)
            } else if to - from > 0 {
                // INCREASE
                if !isEnabled {
                    return
                }
                increaseOffsetInRootView(from: from, to: to, rootView: rootView)
            } else if to - from < 0 {
                // DECREASE
                if !isEnabled {
                    return
                }
                decreaseOffsetInRootView(from: from, to: to, rootView: rootView)
            }
        }

        private func decreaseOffsetInRootView(from: CGFloat, to: CGFloat, rootView: UIView) {
            let addedOffset = to - from
            let shouldAddOffset = showAnimator.isAnimationRunning || wasAddOffsetInRootViewAborted
            let newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset

            if newBottomOffset < 0 {
                return
            }

            runAnimator(
                withDuration: hideDuration,
                delay: hideDelay,
                easing: easingOption,
                onStart: {
                    self.hideAnimator.beginAnimation(
                        initialOffset: self.bottomOffset,
                        addedOffset: newBottomOffset - self.bottomOffset
                    )
                    self.showAnimator.cleanup()
                },
                onAnimate: {
                    self.hideAnimator.setupAnimationTimers(rootView: rootView)

                    rootView.frame.origin.y = -newBottomOffset
                },
                onComplete: {
                    self.hideAnimator.completeAnimation(with: newBottomOffset)
                    self.bottomOffset = newBottomOffset
                }
            )
        }

        private func increaseOffsetInRootView(from: CGFloat, to: CGFloat, rootView: UIView) {
            let addedOffset = to - from
            let shouldAddOffset = hideAnimator.isAnimationRunning || wasAddOffsetInRootViewAborted
            let newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset

            if newBottomOffset < 0 {
                return
            }

            runAnimator(
                withDuration: showDuration,
                delay: showDelay,
                easing: easingOption,
                onStart: {
                    self.showAnimator.beginAnimation(
                        initialOffset: self.bottomOffset,
                        addedOffset: newBottomOffset - self.bottomOffset
                    )
                    self.softInputVisible = true
                    self.hideAnimator.cleanup()
                },
                onAnimate: {
                    self.showAnimator.setupAnimationTimers(rootView: rootView)

                    rootView.frame.origin.y = -newBottomOffset
                },
                onComplete: {
                    self.showAnimator.completeAnimation(with: newBottomOffset)
                    self.bottomOffset = newBottomOffset
                }
            )
        }

        private func removeOffsetInRootView(rootView: UIView) {
            if rootView.frame.origin.y == 0 {
                // https://github.com/mateusz1913/react-native-avoid-softinput/issues/86
                // If we are here, it means that the view which had offset applied was probably unmounted.
                // This can happen e.g. when user interactively dismiss iOS modal screen in react-navigation
                // (I reproduced it in Native Stack, but the issue reporters had it in JS Stack -
                // - both use react-native-screens under the hood)
                return
            }

            let initialRootViewFrameOriginY = rootView.frame.origin.y

            runAnimator(
                withDuration: hideDuration,
                delay: hideDelay,
                easing: easingOption,
                onStart: {
                    self.hideAnimator.beginAnimation(
                        initialOffset: self.bottomOffset,
                        addedOffset: -self.bottomOffset
                    )
                    self.showAnimator.cleanup()
                },
                onAnimate: {
                    self.hideAnimator.setupAnimationTimers(rootView: rootView)

                    rootView.frame.origin.y += self.bottomOffset // at the end, origin.y should be equal to 0
                },
                onComplete: {
                    if initialRootViewFrameOriginY == rootView.frame.origin.y {
                        // https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
                        // Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
                        self.hideAnimator.completeAnimation(with: self.bottomOffset)
                    } else {
                        self.bottomOffset = 0
                        self.hideAnimator.completeAnimation(
                            with: self.bottomOffset,
                            shouldSaveCurrentAppliedOffset: true
                        )
                        self.softInputVisible = false
                        self.lastFocusedView = nil
                    }
                }
            )
        }

        private func addOffsetInRootView(_ offset: CGFloat, firstResponder: UIView, rootView: UIView) {
            guard let firstResponderDistanceToBottom = firstResponder.getDistanceToBottomEdgeInRootView(rootView) else {
                wasAddOffsetInRootViewAborted = true
                return
            }

            let newOffset = max(offset - firstResponderDistanceToBottom, 0)

            if newOffset <= 0 {
                wasAddOffsetInRootViewAborted = true
                return
            }

            wasAddOffsetInRootViewAborted = false
            bottomOffset = newOffset + avoidOffset

            runAnimator(
                withDuration: showDuration,
                delay: showDelay,
                easing: easingOption,
                onStart: {
                    self.showAnimator.beginAnimation(
                        initialOffset: 0,
                        addedOffset: self.bottomOffset
                    )
                    self.softInputVisible = true
                    self.hideAnimator.cleanup()
                },
                onAnimate: {
                    self.showAnimator.setupAnimationTimers(rootView: rootView)

                    rootView.frame.origin.y = -self.bottomOffset
                },
                onComplete: {
                    self.showAnimator.completeAnimation(with: self.bottomOffset, shouldSaveCurrentAppliedOffset: true)
                }
            )
        }

        private func setOffsetInScrollView(
            from: CGFloat,
            to: CGFloat,
            isOrientationChange: Bool,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            if softInputVisible, isOrientationChange {
                // RESET
                addOffsetInScrollView(to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
                return
            }
            if to == from {
                return
            }
            if to == 0 {
                // HIDE
                // Run remove offset method no matter if it is enabled (in case applied offset is 0, it will be no-op)
                removeOffsetInScrollView(scrollView: scrollView, rootView: rootView)
            } else if to - from > 0, !softInputVisible || from == 0 {
                // SHOW
                if !isEnabled {
                    return
                }
                addOffsetInScrollView(to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
            } else if to - from > 0 {
                // INCREASE
                if !isEnabled {
                    return
                }
                increaseOffsetInScrollView(
                    from: from,
                    to: to,
                    firstResponder: firstResponder,
                    scrollView: scrollView,
                    rootView: rootView
                )
            } else if to - from < 0 {
                // DECREASE
                if !isEnabled {
                    return
                }
                decreaseOffsetInScrollView(
                    from: from,
                    to: to,
                    firstResponder: firstResponder,
                    scrollView: scrollView,
                    rootView: rootView
                )
            }
        }

        private func decreaseOffsetInScrollView(
            from: CGFloat,
            to: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            let addedOffset = to - from
            let shouldAddOffset = showAnimator.isAnimationRunning || wasAddOffsetInScrollViewAborted
            let newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset
            let scrollToOffset = getScrollToOffset(
                softInputHeight: to,
                firstResponder: firstResponder,
                scrollView: scrollView,
                rootView: rootView
            )

            if newBottomOffset < 0 {
                return
            }

            runAnimator(
                withDuration: hideDuration,
                delay: hideDelay,
                easing: easingOption,
                onStart: {
                    self.hideAnimator.beginAnimation(
                        initialOffset: self.bottomOffset,
                        addedOffset: newBottomOffset - self.bottomOffset
                    )
                    self.showAnimator.cleanup()
                },
                onAnimate: {
                    self.hideAnimator.setupAnimationTimers(rootView: rootView)

                    var newContentInset = scrollView.contentInset
                    newContentInset.bottom = newBottomOffset
                    var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
                    newScrollIndicatorInsets.bottom = newBottomOffset

                    scrollView.contentInset = newContentInset
                    scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
                    scrollView.contentOffset = CGPoint(
                        x: scrollView.contentOffset.x,
                        y: scrollView.contentOffset.y + scrollToOffset
                    )
                },
                onComplete: {
                    self.hideAnimator.completeAnimation(with: newBottomOffset)
                    self.bottomOffset = newBottomOffset
                }
            )
        }

        private func increaseOffsetInScrollView(
            from: CGFloat,
            to: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            let addedOffset = to - from
            let shouldAddOffset = hideAnimator.isAnimationRunning || wasAddOffsetInScrollViewAborted
            let newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset
            let scrollToOffset = getScrollToOffset(
                softInputHeight: to,
                firstResponder: firstResponder,
                scrollView: scrollView,
                rootView: rootView
            )

            if newBottomOffset < 0 {
                return
            }

            runAnimator(
                withDuration: showDuration,
                delay: showDelay,
                easing: easingOption,
                onStart: {
                    self.showAnimator.beginAnimation(
                        initialOffset: self.bottomOffset,
                        addedOffset: newBottomOffset - self.bottomOffset
                    )
                    self.softInputVisible = true
                    self.hideAnimator.cleanup()
                },
                onAnimate: {
                    self.showAnimator.setupAnimationTimers(rootView: rootView)

                    var newContentInset = scrollView.contentInset
                    newContentInset.bottom = newBottomOffset
                    var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
                    newScrollIndicatorInsets.bottom = newBottomOffset

                    scrollView.contentInset = newContentInset
                    scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
                    scrollView.contentOffset = CGPoint(
                        x: scrollView.contentOffset.x,
                        y: scrollView.contentOffset.y + scrollToOffset
                    )
                },
                onComplete: {
                    self.showAnimator.completeAnimation(with: newBottomOffset)
                    self.bottomOffset = newBottomOffset
                }
            )
        }

        private func removeOffsetInScrollView(scrollView: UIScrollView, rootView: UIView) {
            let initialScrollViewContentInset = scrollView.contentInset
            let initialScrollViewScrollIndicatorInsets = scrollView.scrollIndicatorInsets

            runAnimator(
                withDuration: hideDuration,
                delay: hideDelay,
                easing: easingOption,
                onStart: {
                    self.hideAnimator.beginAnimation(initialOffset: self.bottomOffset, addedOffset: -self.bottomOffset)
                    self.showAnimator.cleanup()
                },
                onAnimate: {
                    self.hideAnimator.setupAnimationTimers(rootView: rootView)

                    scrollView.contentInset = self.scrollContentInset
                    scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
                    self.scrollContentInset = .zero
                    self.scrollIndicatorInsets = .zero
                },
                onComplete: {
                    let areContentInsetsEqual = initialScrollViewContentInset == scrollView.contentInset
                    let areScrollIndicatorInsetsEqual =
                        initialScrollViewScrollIndicatorInsets == scrollView.scrollIndicatorInsets
                    if areContentInsetsEqual, areScrollIndicatorInsetsEqual {
                        // https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
                        // Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
                        self.hideAnimator.completeAnimation(with: self.bottomOffset)
                    } else {
                        self.bottomOffset = 0
                        self.hideAnimator.completeAnimation(
                            with: self.bottomOffset,
                            shouldSaveCurrentAppliedOffset: true
                        )
                        self.softInputVisible = false
                        self.lastFocusedView = nil
                    }
                }
            )
        }

        private func addOffsetInScrollView(
            _ offset: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            guard let scrollViewDistanceToBottom = scrollView.getDistanceToBottomEdgeInRootView(rootView) else {
                wasAddOffsetInScrollViewAborted = true
                return
            }

            let scrollToOffset = getScrollToOffset(
                softInputHeight: offset,
                firstResponder: firstResponder,
                scrollView: scrollView,
                rootView: rootView
            )

            let newOffset = max(offset - scrollViewDistanceToBottom, 0)

            if newOffset <= 0 {
                wasAddOffsetInScrollViewAborted = true
                return
            }

            wasAddOffsetInScrollViewAborted = false
            bottomOffset = newOffset + avoidOffset

            if !softInputVisible {
                // Save original scroll insets
                scrollContentInset = scrollView.contentInset
                scrollIndicatorInsets = scrollView.scrollIndicatorInsets
            }

            runAnimator(
                withDuration: showDuration,
                delay: showDelay,
                easing: easingOption,
                onStart: {
                    self.showAnimator.beginAnimation(initialOffset: 0, addedOffset: self.bottomOffset)
                    self.softInputVisible = true
                    self.hideAnimator.cleanup()
                },
                onAnimate: {
                    self.showAnimator.setupAnimationTimers(rootView: rootView)

                    var newContentInset = scrollView.contentInset
                    newContentInset.bottom = max(self.bottomOffset, scrollView.contentInset.bottom)
                    var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
                    newScrollIndicatorInsets.bottom = max(self.bottomOffset, scrollView.scrollIndicatorInsets.bottom)
                    scrollView.contentInset = newContentInset
                    scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
                    scrollView.contentOffset = CGPoint(
                        x: scrollView.contentOffset.x,
                        y: scrollView.contentOffset.y + scrollToOffset
                    )
                },
                onComplete: {
                    self.showAnimator.completeAnimation(with: self.bottomOffset, shouldSaveCurrentAppliedOffset: true)
                }
            )
        }

        private func getScrollToOffset(
            softInputHeight: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) -> CGFloat {
            guard
                let firstResponderPosition = firstResponder.getPositionInSuperview(),
                let scrollViewPosition = scrollView.getPositionInSuperview()
            else {
                return 0
            }

            let firstResponderBottomEdgeY = firstResponderPosition.y + firstResponder.frame.height
            let firstResponderDistanceToBottom =
                rootView.getScreenHeight() - firstResponderBottomEdgeY - rootView.getSafeBottomInset()

            return min(
                max(softInputHeight - firstResponderDistanceToBottom, 0),
                firstResponderPosition.y - scrollViewPosition.y
            )
        }
    #endif
}
