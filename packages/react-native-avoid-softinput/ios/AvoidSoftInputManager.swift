class AvoidSoftInputManager: NSObject {
    static let HIDE_ANIMATION_DELAY_IN_SECONDS: Double = 0.3
    static let HIDE_ANIMATION_DURATION_IN_SECONDS: Double = 0.66
    static let SHOW_ANIMATION_DELAY_IN_SECONDS: Double = 0
    static let SHOW_ANIMATION_DURATION_IN_SECONDS: Double = 0.22
    
    #if os(iOS)
    private var addedHideOffset: CGFloat = 0
    private var addedShowOffset: CGFloat = 0
    private var avoidOffset: CGFloat = 0
    private var bottomOffset: CGFloat = 0
    private var currentAppliedOffset: CGFloat = 0
    private var currentFakeHideAnimationViewAlpha: CGFloat = 0
    private var currentFakeShowAnimationViewAlpha: CGFloat = 0
    private var currentFocusedView: UIView? = nil
    private var easingOption: UIView.AnimationOptions = .curveLinear
    private var fakeHideAnimationView = UIView()
    private var fakeShowAnimationView = UIView()
    private lazy var hideAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
    private var hideDelay: Double = HIDE_ANIMATION_DELAY_IN_SECONDS
    private var hideDuration: Double = HIDE_ANIMATION_DURATION_IN_SECONDS
    private var initialHideOffset: CGFloat = 0
    private var initialShowOffset: CGFloat = 0
    private var isEnabled: Bool = false
    private var isHideAnimationCancelled: Bool = false
    private var isHideAnimationRunning: Bool = false
    private var isShowAnimationCancelled: Bool = false
    private var isShowAnimationRunning: Bool = false
    private var onOffsetChanged: ((CGFloat) -> Void)? = nil
    private var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    private var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    private var shouldCheckForAvoidSoftInputView: Bool = false
    private lazy var showAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
    private var showDelay: Double = SHOW_ANIMATION_DELAY_IN_SECONDS
    private var showDuration: Double = SHOW_ANIMATION_DURATION_IN_SECONDS
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
            hideDelay = AvoidSoftInputManager.HIDE_ANIMATION_DELAY_IN_SECONDS
        }
    }
    
    func setHideAnimationDuration(_ duration: NSNumber?) {
        if let duration = duration {
            hideDuration = duration.doubleValue / 1000
        } else {
            hideDuration = AvoidSoftInputManager.HIDE_ANIMATION_DURATION_IN_SECONDS
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
            showDelay = AvoidSoftInputManager.SHOW_ANIMATION_DELAY_IN_SECONDS
        }
    }
    
    func setShowAnimationDuration(_ duration: NSNumber?) {
        if let duration = duration {
            showDuration = duration.doubleValue / 1000
        } else {
            showDuration = AvoidSoftInputManager.SHOW_ANIMATION_DURATION_IN_SECONDS
        }
    }
       
    func softInputHeightWillChange(from: CGFloat, to: CGFloat, isOrientationChange: Bool, customRootView: UIView? = nil) {
        guard let viewController = RCTPresentedViewController() else {
            return
        }
        
        let rootView = getReactRootView(withRootViewController: viewController)
        
        guard let firstResponder = findFirstResponder(view: rootView) ?? currentFocusedView else {
            return
        }
        
        currentFocusedView = firstResponder
        
        if let customRootView = customRootView {
            setOffset(from: from, to: to, isOrientationChange: isOrientationChange, firstResponder: firstResponder, rootView: customRootView)
        } else {
            if shouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(view: firstResponder) {
                return
            }
            
            setOffset(from: from, to: to, isOrientationChange: isOrientationChange, firstResponder: firstResponder, rootView: rootView)
        }
    }
    
    private func setOffset(from: CGFloat, to: CGFloat, isOrientationChange: Bool, firstResponder: UIView, rootView: UIView) {
        if let scrollView = findScrollViewForFirstResponder(view: firstResponder, rootView: rootView) {
            setOffsetInScrollView(from: from, to: to, isOrientationChange: isOrientationChange, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        } else {
            setOffsetInRootView(from: from, to: to, isOrientationChange: isOrientationChange, firstResponder: firstResponder, rootView: rootView)
        }
    }
    
    private func setOffsetInRootView(from: CGFloat, to: CGFloat, isOrientationChange: Bool, firstResponder: UIView, rootView: UIView) {
        if softInputVisible && isOrientationChange {
            // RESET
            addOffsetInRootView(to, firstResponder: firstResponder, rootView: rootView)
            return
        }
        if to == from {
            return
        }
        if to == 0 {
            // HIDE
            // Run remove offset method no matter if manager is enabled (in case applied offset is 0, it will be no-op)
            removeOffsetInRootView(rootView: rootView)
        } else if to - from > 0 && (!softInputVisible || from == 0) {
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
        let newBottomOffset = isShowAnimationRunning || wasAddOffsetInRootViewAborted ? bottomOffset : bottomOffset + addedOffset
        
        if newBottomOffset < 0 {
            return
        }

        beginHideAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupHideAnimationTimers(rootView: rootView)
            
            rootView.frame.origin.y = -newBottomOffset
        } completion: { isCompleted in
            self.completeHideAnimation(with: newBottomOffset)
        }
    }
    
    private func increaseOffsetInRootView(from: CGFloat, to: CGFloat, rootView: UIView) {
        let addedOffset = to - from
        let newBottomOffset = isHideAnimationRunning || wasAddOffsetInRootViewAborted ? bottomOffset : bottomOffset + addedOffset
        
        if newBottomOffset < 0 {
            return
        }

        beginShowAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupShowAnimationTimers(rootView: rootView)
            
            rootView.frame.origin.y = -newBottomOffset
        } completion: { isCompleted in
            self.completeShowAnimation(with: newBottomOffset)
        }
    }
    
    private func removeOffsetInRootView(rootView: UIView) {
        if rootView.frame.origin.y == 0 {
            // https://github.com/mateusz1913/react-native-avoid-softinput/issues/86
            // If we are here, it means that the view which had offset applied was probably unmounted.
            // This can happen e.g. when user interactively dismiss iOS modal screen in react-navigation
            // (I reproduced it in Native Stack, but the issue reporters had it in JS Stack - both use react-native-screens under the hood)
            return
        }
        let initialRootViewFrameOriginY = rootView.frame.origin.y
        beginHideAnimation(initialOffset: bottomOffset, addedOffset: -bottomOffset)
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupHideAnimationTimers(rootView: rootView)
            
            rootView.frame.origin.y += self.bottomOffset // at the end, origin.y should be equal to 0
        } completion: { isCompleted in
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
        guard let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil) else {
            wasAddOffsetInRootViewAborted = true
            return
        }
        
        var bottomSafeInset: CGFloat = 0
        if #available(iOS 11.0, tvOS 11.0, *) {
            bottomSafeInset = rootView.safeAreaInsets.bottom
        }
        
        let firstResponderDistanceToBottom = UIScreen.main.bounds.size.height - (firstResponderPosition.y + firstResponder.frame.height) - bottomSafeInset
        
        let newOffset = max(offset - firstResponderDistanceToBottom, 0)
        
        if (newOffset <= 0) {
            wasAddOffsetInRootViewAborted = true
            return
        }
        
        wasAddOffsetInRootViewAborted = false
        bottomOffset = newOffset + avoidOffset
        
        beginShowAnimation(initialOffset: 0, addedOffset: bottomOffset)
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupShowAnimationTimers(rootView: rootView)
            
            rootView.frame.origin.y = -self.bottomOffset
        } completion: { isCompleted in
            self.completeShowAnimation()
        }
    }
    
    private func setOffsetInScrollView(from: CGFloat, to: CGFloat, isOrientationChange: Bool, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) {
        if softInputVisible && isOrientationChange {
            // RESET
            addOffsetInScrollView(to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
            return
        }
        if to == from {
            return
        }
        if to == 0 {
            // HIDE
            // Run remove offset method no matter if manager is enabled (in case applied offset is 0, it will be no-op)
            removeOffsetInScrollView(scrollView: scrollView, rootView: rootView)
        } else if to - from > 0 && (!softInputVisible || from == 0) {
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
            increaseOffsetInScrollView(from: from, to: to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        } else if to - from < 0 {
            // DECREASE
            if !isEnabled {
                return
            }
            decreaseOffsetInScrollView(from: from, to: to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        }
    }
    
    private func decreaseOffsetInScrollView(from: CGFloat, to: CGFloat, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) {
        let addedOffset = to - from
        let newBottomOffset = isShowAnimationRunning || wasAddOffsetInScrollViewAborted ? bottomOffset : bottomOffset + addedOffset
        let scrollToOffset = getScrollToOffset(softInputHeight: to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        
        if newBottomOffset < 0 {
            return
        }
        
        beginHideAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupHideAnimationTimers(rootView: rootView)
            
            var newContentInset = scrollView.contentInset
            newContentInset.bottom = newBottomOffset
            var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
            newScrollIndicatorInsets.bottom = newBottomOffset

            scrollView.contentInset = newContentInset
            scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
            scrollView.contentOffset = CGPoint(x: scrollView.contentOffset.x, y: scrollView.contentOffset.y + scrollToOffset)
        } completion: { isCompleted in
            self.completeHideAnimation(with: newBottomOffset)
        }
    }
    
    private func increaseOffsetInScrollView(from: CGFloat, to: CGFloat, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) {
        let addedOffset = to - from
        let newBottomOffset = isHideAnimationRunning || wasAddOffsetInScrollViewAborted ? bottomOffset : bottomOffset + addedOffset
        let scrollToOffset = getScrollToOffset(softInputHeight: to, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        
        if newBottomOffset < 0 {
            return
        }
        
        beginShowAnimation(initialOffset: bottomOffset, addedOffset: newBottomOffset - bottomOffset)
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupShowAnimationTimers(rootView: rootView)
            
            var newContentInset = scrollView.contentInset
            newContentInset.bottom = newBottomOffset
            var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
            newScrollIndicatorInsets.bottom = newBottomOffset

            scrollView.contentInset = newContentInset
            scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
            scrollView.contentOffset = CGPoint(x: scrollView.contentOffset.x, y: scrollView.contentOffset.y + scrollToOffset)
        } completion: { isCompleted in
            self.completeShowAnimation(with: newBottomOffset)
        }
    }
    
    private func removeOffsetInScrollView(scrollView: UIScrollView, rootView: UIView) {
        let initialScrollViewContentInset = scrollView.contentInset
        let initialScrollViewScrollIndicatorInsets = scrollView.scrollIndicatorInsets
        beginHideAnimation(initialOffset: bottomOffset, addedOffset: -bottomOffset)
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupHideAnimationTimers(rootView: rootView)
            
            scrollView.contentInset = self.scrollContentInset
            scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
            self.scrollContentInset = .zero
            self.scrollIndicatorInsets = .zero
        } completion: { isCompleted in
            if initialScrollViewContentInset == scrollView.contentInset && initialScrollViewScrollIndicatorInsets == scrollView.scrollIndicatorInsets {
                // https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
                // Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
                self.completeHideAnimation(with: self.bottomOffset)
            } else {
                self.completeHideAnimation()
            }
        }
    }
    
    private func addOffsetInScrollView(_ offset: CGFloat, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) {
        var bottomSafeInset: CGFloat = 0
        if #available(iOS 11.0, tvOS 11.0, *) {
            bottomSafeInset = rootView.safeAreaInsets.bottom
        }
        
        guard let scrollViewPosition = scrollView.superview?.convert(scrollView.frame.origin, to: nil) else {
            wasAddOffsetInScrollViewAborted = true
            return
        }
        
        let scrollViewDistanceToBottom = UIScreen.main.bounds.size.height - (scrollViewPosition.y + scrollView.frame.height) - bottomSafeInset
        
        let scrollToOffset = getScrollToOffset(softInputHeight: offset, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
        
        let newOffset = max(offset - scrollViewDistanceToBottom, 0)
        
        if newOffset <= 0 {
            wasAddOffsetInScrollViewAborted = true
            return
        }
        
        wasAddOffsetInScrollViewAborted = false
        bottomOffset = newOffset + avoidOffset
        
        if !softInputVisible {
            // Save original scroll insets
            self.scrollContentInset = scrollView.contentInset
            self.scrollIndicatorInsets = scrollView.scrollIndicatorInsets
        }

        beginShowAnimation(initialOffset: 0, addedOffset: bottomOffset)
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.setupShowAnimationTimers(rootView: rootView)
            
            var newContentInset = scrollView.contentInset
            newContentInset.bottom = max(self.bottomOffset, scrollView.contentInset.bottom)
            var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
            newScrollIndicatorInsets.bottom = max(self.bottomOffset, scrollView.scrollIndicatorInsets.bottom)
            scrollView.contentInset = newContentInset
            scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
            scrollView.contentOffset = CGPoint(x: scrollView.contentOffset.x, y: scrollView.contentOffset.y + scrollToOffset)
        } completion: { isCompleted in
            self.completeShowAnimation()
        }
    }
    
    private func getScrollToOffset(softInputHeight: CGFloat, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) -> CGFloat {
        guard let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil) else {
            return 0
        }
        
        var bottomSafeInset: CGFloat = 0
        if #available(iOS 11.0, tvOS 11.0, *) {
            bottomSafeInset = rootView.safeAreaInsets.bottom
        }
        
        let firstResponderDistanceToBottom = UIScreen.main.bounds.size.height - (firstResponderPosition.y + firstResponder.frame.height) - bottomSafeInset
        
        guard let scrollViewPosition = scrollView.superview?.convert(scrollView.frame.origin, to: nil) else {
            return 0
        }
        
        return min(max(softInputHeight - firstResponderDistanceToBottom, 0), (firstResponderPosition.y - scrollViewPosition.y))
    }
    
    private func beginHideAnimation(initialOffset: CGFloat, addedOffset: CGFloat) {
        isHideAnimationRunning = true
        fakeHideAnimationView.alpha = 1.0
        isHideAnimationCancelled = false
        isShowAnimationCancelled = true
        initialHideOffset = initialOffset
        addedHideOffset = addedOffset
        if initialOffset + addedOffset == 0 && addedOffset != 0 {
            if let onOffsetChanged = onOffsetChanged {
                onOffsetChanged(initialHideOffset)
            }
        }
    }
    
    private func setupHideAnimationTimers(rootView: UIView) {
        self.hideAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
        self.hideAnimationTimer.add(to: .current, forMode: .default)
        rootView.addSubview(self.fakeHideAnimationView)
        self.fakeHideAnimationView.alpha = 0.0
        
        self.showAnimationTimer.isPaused = true
        self.showAnimationTimer.invalidate()
        self.currentFakeShowAnimationViewAlpha = 0.0
    }
    
    private func completeHideAnimation(with newBottomOffset: CGFloat? = nil) {
        self.isHideAnimationRunning = false
        if self.isHideAnimationCancelled {
            return
        }
        self.hideAnimationTimer.isPaused = true
        self.hideAnimationTimer.invalidate()
        self.currentFakeHideAnimationViewAlpha = 1.0
        self.fakeHideAnimationView.alpha = 1.0
        self.fakeHideAnimationView.removeFromSuperview()
        
        if let newBottomOffset = newBottomOffset {
            if let onOffsetChanged = self.onOffsetChanged {
                onOffsetChanged(newBottomOffset)
            }

            self.bottomOffset = newBottomOffset
            self.initialHideOffset = newBottomOffset
            self.addedHideOffset = 0
        } else {
            if let onOffsetChanged = self.onOffsetChanged {
                onOffsetChanged(0)
            }
            
            self.softInputVisible = false
            self.currentFocusedView = nil
            self.bottomOffset = 0
            self.initialHideOffset = 0
            self.addedHideOffset = 0
            self.currentAppliedOffset = 0
        }
    }
    
    private func beginShowAnimation(initialOffset: CGFloat, addedOffset: CGFloat) {
        isShowAnimationRunning = true
        fakeShowAnimationView.alpha = 0.0
        isHideAnimationCancelled = true
        isShowAnimationCancelled = false
        initialShowOffset = initialOffset
        addedShowOffset = addedOffset
        if initialOffset + addedOffset == bottomOffset && addedOffset != 0 {
            if let onOffsetChanged = onOffsetChanged {
                onOffsetChanged(0)
            }
        }
    }
    
    private func setupShowAnimationTimers(rootView: UIView) {
        self.showAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
        self.showAnimationTimer.add(to: .current, forMode: .default)
        rootView.addSubview(self.fakeShowAnimationView)
        self.fakeShowAnimationView.alpha = 1.0
        
        self.hideAnimationTimer.isPaused = true
        self.hideAnimationTimer.invalidate()
        self.currentFakeHideAnimationViewAlpha = 1.0
    }
    
    private func completeShowAnimation(with newBottomOffset: CGFloat? = nil) {
        self.isShowAnimationRunning = false
        if self.isShowAnimationCancelled {
            return
        }
        self.showAnimationTimer.isPaused = true
        self.showAnimationTimer.invalidate()
        self.currentFakeShowAnimationViewAlpha = 0.0
        self.fakeShowAnimationView.alpha = 0.0
        self.fakeShowAnimationView.removeFromSuperview()
        
        self.softInputVisible = true
        if let newBottomOffset = newBottomOffset {
            if let onOffsetChanged = self.onOffsetChanged {
                onOffsetChanged(newBottomOffset)
            }

            self.bottomOffset = newBottomOffset
            self.initialShowOffset = newBottomOffset
            self.addedShowOffset = 0
        } else {
            if let onOffsetChanged = self.onOffsetChanged {
                onOffsetChanged(self.bottomOffset)
            }
            
            self.currentAppliedOffset = self.bottomOffset
            self.initialShowOffset = self.bottomOffset
            self.addedShowOffset = 0
        }
    }
    
    @objc private func updateHideAnimation() {
        guard let currentFakeAlpha = self.fakeHideAnimationView.layer.presentation()?.opacity else {
            return
        }

        if currentFakeHideAnimationViewAlpha == CGFloat(currentFakeAlpha) {
            return
        }

        currentFakeHideAnimationViewAlpha = CGFloat(currentFakeAlpha)
        let newCurrentOffset = self.initialHideOffset + currentFakeHideAnimationViewAlpha * self.addedHideOffset
        if newCurrentOffset > currentAppliedOffset {
            return
        }

        currentAppliedOffset = newCurrentOffset
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(newCurrentOffset)
        }
    }
    
    @objc private func updateShowAnimation() {
        guard let currentFakeAlpha = self.fakeShowAnimationView.layer.presentation()?.opacity else {
            return
        }

        if currentFakeShowAnimationViewAlpha == CGFloat(currentFakeAlpha) {
            return
        }

        currentFakeShowAnimationViewAlpha = CGFloat(currentFakeAlpha)
        let newCurrentOffset = self.initialShowOffset + currentFakeShowAnimationViewAlpha * self.addedShowOffset
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
