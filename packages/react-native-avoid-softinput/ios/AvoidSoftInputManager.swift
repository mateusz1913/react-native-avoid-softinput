class AvoidSoftInputManager: NSObject {
    #if os(iOS)
        private var addedHideOffset: CGFloat = 0
        private var addedShowOffset: CGFloat = 0
        private var avoidOffset: CGFloat = 0
        private var bottomOffset: CGFloat = 0
        private var currentAppliedOffset: CGFloat = 0
        private var currentFakeHideAnimationViewAlpha: CGFloat = 0
        private var currentFakeShowAnimationViewAlpha: CGFloat = 0
        private var currentFocusedView: UIView?
        private var easingOption: UIView.AnimationOptions = .curveLinear
        private var fakeHideAnimationView = UIView()
        private var fakeShowAnimationView = UIView()
        private lazy var hideAnimationTimer: CADisplayLink =
            CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
        private var hideDelay: Double = AvoidSoftInputConstants.hideAnimationDelayInSeconds
        private var hideDuration: Double = AvoidSoftInputConstants.hideAnimationDurationInSeconds
        private var initialHideOffset: CGFloat = 0
        private var initialShowOffset: CGFloat = 0
        private var isEnabled: Bool = false
        private var isHideAnimationCancelled: Bool = false
        private var isHideAnimationRunning: Bool = false
        private var isShowAnimationCancelled: Bool = false
        private var isShowAnimationRunning: Bool = false
        private var onOffsetChanged: ((CGFloat) -> Void)?
        private var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
        private var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
        private var shouldCheckForAvoidSoftInputView: Bool = false
        private lazy var showAnimationTimer: CADisplayLink =
            CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
        private var showDelay: Double = AvoidSoftInputConstants.showAnimationDelayInSeconds
        private var showDuration: Double = AvoidSoftInputConstants.showAnimationDurationInSeconds
        private var softInputVisible: Bool = false
        private var wasAddOffsetInRootViewAborted = false
        private var wasAddOffsetInScrollViewAborted = false

        func setAvoidOffset(_ offset: NSNumber) {
            avoidOffset = CGFloat(offset.floatValue)
        }

        func setEasing(_ easing: NSString) {
            if easing == "easeIn" {
                easingOption = .curveEaseIn
            } else if easing == "easeInOut" {
                easingOption = .curveEaseInOut
            } else if easing == "easeOut" {
                easingOption = .curveEaseOut
            } else {
                easingOption = .curveLinear
            }
        }

        func setIsEnabled(_ enabled: Bool) {
            isEnabled = enabled
        }

        func setHideAnimationDelay(_ delay: NSNumber?) {
            if let delay = delay {
                hideDelay = delay.doubleValue / 1000
            } else {
                hideDelay = AvoidSoftInputConstants.hideAnimationDelayInSeconds
            }
        }

        func setHideAnimationDuration(_ duration: NSNumber?) {
            if let duration = duration {
                hideDuration = duration.doubleValue / 1000
            } else {
                hideDuration = AvoidSoftInputConstants.hideAnimationDurationInSeconds
            }
        }

        func setOnOffsetChanged(listener: ((CGFloat) -> Void)?) {
            onOffsetChanged = listener
        }

        func setShouldCheckForAvoidSoftInputView(_ shouldCheck: Bool) {
            shouldCheckForAvoidSoftInputView = shouldCheck
        }

        func setShowAnimationDelay(_ delay: NSNumber?) {
            if let delay = delay {
                showDelay = delay.doubleValue / 1000
            } else {
                showDelay = AvoidSoftInputConstants.showAnimationDelayInSeconds
            }
        }

        func setShowAnimationDuration(_ duration: NSNumber?) {
            if let duration = duration {
                showDuration = duration.doubleValue / 1000
            } else {
                showDuration = AvoidSoftInputConstants.showAnimationDurationInSeconds
            }
        }

        func softInputHeightWillChange(
            from: CGFloat,
            to: CGFloat,
            isOrientationChange: Bool,
            customRootView: UIView? = nil
        ) {
            guard let viewController = RCTPresentedViewController() else {
                return
            }

            let rootView = AvoidSoftInputObjCPPUtils.getReactRootView(withRootViewController: viewController)

            guard let firstResponder = findFirstResponder(view: rootView) ?? currentFocusedView else {
                return
            }

            currentFocusedView = firstResponder

            if let customRootView = customRootView {
                setOffset(
                    from: from,
                    to: to,
                    isOrientationChange: isOrientationChange,
                    firstResponder: firstResponder,
                    rootView: customRootView
                )
            } else {
                let isNestedInAvoidSoftInputView =
                    shouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(view: firstResponder)
                if isNestedInAvoidSoftInputView {
                    return
                }

                setOffset(
                    from: from,
                    to: to,
                    isOrientationChange: isOrientationChange,
                    firstResponder: firstResponder,
                    rootView: rootView
                )
            }
        }

        private func setOffset(
            from: CGFloat,
            to: CGFloat,
            isOrientationChange: Bool,
            firstResponder: UIView,
            rootView: UIView
        ) {
            if let scrollView = findScrollViewForFirstResponder(view: firstResponder, rootView: rootView) {
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
            let newBottomOffset =
                isShowAnimationRunning || wasAddOffsetInRootViewAborted ? bottomOffset : bottomOffset + addedOffset

            if newBottomOffset < 0 {
                return
            }

            beginHideAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
            UIView.animate(
                withDuration: hideDuration,
                delay: hideDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupHideAnimationTimers(rootView: rootView)

                rootView.frame.origin.y = -newBottomOffset
            } completion: { _ in
                self.completeHideAnimation(with: newBottomOffset)
            }
        }

        private func increaseOffsetInRootView(from: CGFloat, to: CGFloat, rootView: UIView) {
            let addedOffset = to - from
            let newBottomOffset =
                isHideAnimationRunning || wasAddOffsetInRootViewAborted ? bottomOffset : bottomOffset + addedOffset

            if newBottomOffset < 0 {
                return
            }

            beginShowAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
            UIView.animate(
                withDuration: showDuration,
                delay: showDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupShowAnimationTimers(rootView: rootView)

                rootView.frame.origin.y = -newBottomOffset
            } completion: { _ in
                self.completeShowAnimation(with: newBottomOffset)
            }
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
            beginHideAnimation(initialOffset: bottomOffset, addedOffset: -bottomOffset)
            UIView.animate(
                withDuration: hideDuration,
                delay: hideDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupHideAnimationTimers(rootView: rootView)

                rootView.frame.origin.y += self.bottomOffset // at the end, origin.y should be equal to 0
            } completion: { _ in
                if initialRootViewFrameOriginY == rootView.frame.origin.y {
                    // https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
                    // Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
                    self.completeHideAnimation(with: self.bottomOffset)
                } else {
                    self.completeHideAnimation()
                }
            }
        }

        private func addOffsetInRootView(_ offset: CGFloat, firstResponder: UIView, rootView: UIView) {
            guard
                let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil)
            else {
                wasAddOffsetInRootViewAborted = true
                return
            }

            var bottomSafeInset: CGFloat = 0
            if #available(iOS 11.0, tvOS 11.0, *) {
                bottomSafeInset = rootView.safeAreaInsets.bottom
            }

            let firstResponderBottomEdgeY = firstResponderPosition.y + firstResponder.frame.height
            let firstResponderDistanceToBottom =
                UIScreen.main.bounds.size.height - firstResponderBottomEdgeY - bottomSafeInset

            let newOffset = max(offset - firstResponderDistanceToBottom, 0)

            if newOffset <= 0 {
                wasAddOffsetInRootViewAborted = true
                return
            }

            wasAddOffsetInRootViewAborted = false
            bottomOffset = newOffset + avoidOffset

            beginShowAnimation(initialOffset: 0, addedOffset: bottomOffset)
            UIView.animate(
                withDuration: showDuration,
                delay: showDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupShowAnimationTimers(rootView: rootView)

                rootView.frame.origin.y = -self.bottomOffset
            } completion: { _ in
                self.completeShowAnimation()
            }
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
            let newBottomOffset =
                isShowAnimationRunning || wasAddOffsetInScrollViewAborted ? bottomOffset : bottomOffset + addedOffset
            let scrollToOffset = getScrollToOffset(
                softInputHeight: to,
                firstResponder: firstResponder,
                scrollView: scrollView,
                rootView: rootView
            )

            if newBottomOffset < 0 {
                return
            }

            beginHideAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
            UIView.animate(
                withDuration: hideDuration,
                delay: hideDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupHideAnimationTimers(rootView: rootView)

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
            } completion: { _ in
                self.completeHideAnimation(with: newBottomOffset)
            }
        }

        private func increaseOffsetInScrollView(
            from: CGFloat,
            to: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            let addedOffset = to - from
            let newBottomOffset =
                isHideAnimationRunning || wasAddOffsetInScrollViewAborted ? bottomOffset : bottomOffset + addedOffset
            let scrollToOffset = getScrollToOffset(
                softInputHeight: to,
                firstResponder: firstResponder,
                scrollView: scrollView,
                rootView: rootView
            )

            if newBottomOffset < 0 {
                return
            }

            beginShowAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
            UIView.animate(
                withDuration: showDuration,
                delay: showDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupShowAnimationTimers(rootView: rootView)

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
            } completion: { _ in
                self.completeShowAnimation(with: newBottomOffset)
            }
        }

        private func removeOffsetInScrollView(scrollView: UIScrollView, rootView: UIView) {
            let initialScrollViewContentInset = scrollView.contentInset
            let initialScrollViewScrollIndicatorInsets = scrollView.scrollIndicatorInsets
            beginHideAnimation(initialOffset: bottomOffset, addedOffset: -bottomOffset)
            UIView.animate(
                withDuration: hideDuration,
                delay: hideDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupHideAnimationTimers(rootView: rootView)

                scrollView.contentInset = self.scrollContentInset
                scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
                self.scrollContentInset = .zero
                self.scrollIndicatorInsets = .zero
            } completion: { _ in
                let areContentInsetsEqual = initialScrollViewContentInset == scrollView.contentInset
                let areScrollIndicatorInsetsEqual =
                    initialScrollViewScrollIndicatorInsets == scrollView.scrollIndicatorInsets
                if areContentInsetsEqual, areScrollIndicatorInsetsEqual {
                    // https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
                    // Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
                    self.completeHideAnimation(with: self.bottomOffset)
                } else {
                    self.completeHideAnimation()
                }
            }
        }

        private func addOffsetInScrollView(
            _ offset: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) {
            var bottomSafeInset: CGFloat = 0
            if #available(iOS 11.0, tvOS 11.0, *) {
                bottomSafeInset = rootView.safeAreaInsets.bottom
            }

            guard let scrollViewPosition = scrollView.superview?.convert(scrollView.frame.origin, to: nil) else {
                wasAddOffsetInScrollViewAborted = true
                return
            }

            let scrollViewDistanceToBottom =
                UIScreen.main.bounds.size.height - (scrollViewPosition.y + scrollView.frame.height) - bottomSafeInset

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

            beginShowAnimation(initialOffset: 0, addedOffset: bottomOffset)
            UIView.animate(
                withDuration: showDuration,
                delay: showDelay,
                options: [
                    .beginFromCurrentState,
                    easingOption
                ]
            ) {
                self.setupShowAnimationTimers(rootView: rootView)

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
            } completion: { _ in
                self.completeShowAnimation()
            }
        }

        private func getScrollToOffset(
            softInputHeight: CGFloat,
            firstResponder: UIView,
            scrollView: UIScrollView,
            rootView: UIView
        ) -> CGFloat {
            guard
                let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil)
            else {
                return 0
            }

            var bottomSafeInset: CGFloat = 0
            if #available(iOS 11.0, tvOS 11.0, *) {
                bottomSafeInset = rootView.safeAreaInsets.bottom
            }

            let firstResponderBottomEdgeY = firstResponderPosition.y + firstResponder.frame.height
            let firstResponderDistanceToBottom =
                UIScreen.main.bounds.size.height - firstResponderBottomEdgeY - bottomSafeInset

            guard let scrollViewPosition = scrollView.superview?.convert(scrollView.frame.origin, to: nil) else {
                return 0
            }

            return min(
                max(softInputHeight - firstResponderDistanceToBottom, 0),
                firstResponderPosition.y - scrollViewPosition.y
            )
        }

        private func beginHideAnimation(initialOffset: CGFloat, addedOffset: CGFloat) {
            isHideAnimationRunning = true
            fakeHideAnimationView.alpha = 0.0
            isHideAnimationCancelled = false
            isShowAnimationCancelled = true
            initialHideOffset = initialOffset
            addedHideOffset = addedOffset
            if initialOffset + addedOffset == 0, addedOffset != 0 {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(initialHideOffset)
                }
            }
        }

        private func setupHideAnimationTimers(rootView: UIView) {
            hideAnimationTimer = CADisplayLink(target: self, selector: #selector(updateHideAnimation))
            hideAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(fakeHideAnimationView)
            fakeHideAnimationView.alpha = 1.0

            showAnimationTimer.isPaused = true
            showAnimationTimer.invalidate()
            currentFakeShowAnimationViewAlpha = 1.0
        }

        private func completeHideAnimation(with newBottomOffset: CGFloat? = nil) {
            isHideAnimationRunning = false
            if isHideAnimationCancelled {
                return
            }
            hideAnimationTimer.isPaused = true
            hideAnimationTimer.invalidate()
            currentFakeHideAnimationViewAlpha = 0.0
            fakeHideAnimationView.alpha = 0.0
            fakeHideAnimationView.removeFromSuperview()

            if let newBottomOffset = newBottomOffset {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(newBottomOffset)
                }

                bottomOffset = newBottomOffset
                initialHideOffset = newBottomOffset
                addedHideOffset = 0
            } else {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(0)
                }

                softInputVisible = false
                currentFocusedView = nil
                bottomOffset = 0
                initialHideOffset = 0
                addedHideOffset = 0
                currentAppliedOffset = 0
            }
        }

        private func beginShowAnimation(initialOffset: CGFloat, addedOffset: CGFloat) {
            isShowAnimationRunning = true
            fakeShowAnimationView.alpha = 0.0
            isHideAnimationCancelled = true
            isShowAnimationCancelled = false
            initialShowOffset = initialOffset
            addedShowOffset = addedOffset
            if initialOffset + addedOffset == bottomOffset, addedOffset != 0 {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(0)
                }
            }
        }

        private func setupShowAnimationTimers(rootView: UIView) {
            showAnimationTimer = CADisplayLink(target: self, selector: #selector(updateShowAnimation))
            showAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(fakeShowAnimationView)
            fakeShowAnimationView.alpha = 1.0

            hideAnimationTimer.isPaused = true
            hideAnimationTimer.invalidate()
            currentFakeHideAnimationViewAlpha = 1.0
        }

        private func completeShowAnimation(with newBottomOffset: CGFloat? = nil) {
            isShowAnimationRunning = false
            if isShowAnimationCancelled {
                return
            }
            showAnimationTimer.isPaused = true
            showAnimationTimer.invalidate()
            currentFakeShowAnimationViewAlpha = 0.0
            fakeShowAnimationView.alpha = 0.0
            fakeShowAnimationView.removeFromSuperview()

            softInputVisible = true
            if let newBottomOffset = newBottomOffset {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(newBottomOffset)
                }

                bottomOffset = newBottomOffset
                initialShowOffset = newBottomOffset
                addedShowOffset = 0
            } else {
                if let onOffsetChanged = onOffsetChanged {
                    onOffsetChanged(bottomOffset)
                }

                currentAppliedOffset = bottomOffset
                initialShowOffset = bottomOffset
                addedShowOffset = 0
            }
        }

        @objc private func updateHideAnimation() {
            guard let currentFakeAlpha = fakeHideAnimationView.layer.presentation()?.opacity else {
                return
            }

            if currentFakeHideAnimationViewAlpha == CGFloat(currentFakeAlpha) {
                return
            }

            currentFakeHideAnimationViewAlpha = CGFloat(currentFakeAlpha)
            let newCurrentOffset = initialHideOffset + currentFakeHideAnimationViewAlpha * addedHideOffset
            if newCurrentOffset > currentAppliedOffset {
                return
            }

            currentAppliedOffset = newCurrentOffset
            if let onOffsetChanged = onOffsetChanged {
                onOffsetChanged(newCurrentOffset)
            }
        }

        @objc private func updateShowAnimation() {
            guard let currentFakeAlpha = fakeShowAnimationView.layer.presentation()?.opacity else {
                return
            }

            if currentFakeShowAnimationViewAlpha == CGFloat(currentFakeAlpha) {
                return
            }

            currentFakeShowAnimationViewAlpha = CGFloat(currentFakeAlpha)
            let newCurrentOffset = initialShowOffset + currentFakeShowAnimationViewAlpha * addedShowOffset
            if newCurrentOffset < currentAppliedOffset {
                return
            }

            currentAppliedOffset = newCurrentOffset
            if let onOffsetChanged = onOffsetChanged {
                onOffsetChanged(newCurrentOffset)
            }
        }
    #endif
}
