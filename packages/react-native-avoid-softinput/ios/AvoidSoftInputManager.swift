class AvoidSoftInputManager: NSObject {
    static let HIDE_ANIMATION_DELAY_IN_SECONDS: Double = 0.3
    static let HIDE_ANIMATION_DURATION_IN_SECONDS: Double = 0.66
    static let SHOW_ANIMATION_DELAY_IN_SECONDS: Double = 0
    static let SHOW_ANIMATION_DURATION_IN_SECONDS: Double = 0.22
    
    #if os(iOS)
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
    private var isEnabled: Bool = false
    private var isViewSlidedUp: Bool = false
    private var isViewSlidingDown: Bool = false
    private var isViewSlidingUp: Bool = false
    private var onOffsetChanged: ((CGFloat) -> Void)? = nil
    private var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    private var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    private var shouldCheckForAvoidSoftInputView: Bool = false
    private lazy var showAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
    private var showDelay: Double = SHOW_ANIMATION_DELAY_IN_SECONDS
    private var showDuration: Double = SHOW_ANIMATION_DURATION_IN_SECONDS
    
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
    
    func softInputWillShow(height: CGFloat, customRootView: UIView? = nil) {
        if isViewSlidedUp || isViewSlidingUp || isEnabled == false {
            return
        }
        
        isViewSlidingUp = true
        guard let viewController = RCTPresentedViewController() else {
            isViewSlidingUp = false
            return
        }
        
        let rootView = getReactRootView(withRootViewController: viewController)
        
        guard let firstResponder = findFirstResponder(view: rootView) else {
            isViewSlidingUp = false
            return
        }
        
        currentFocusedView = firstResponder
        
        if let customRootView = customRootView {
            applyOffset(height: height, firstResponder: firstResponder, rootView: customRootView)
            return
        }

        if shouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(view: firstResponder) {
            isViewSlidingUp = false
            return
        }
        
        applyOffset(height: height, firstResponder: firstResponder, rootView: rootView)
    }
    
    func softInputWillHide(customRootView: UIView? = nil) {
        if (!isViewSlidedUp && !isViewSlidingUp) || isViewSlidingDown || isEnabled == false {
            return
        }
        
        isViewSlidingDown = true
        guard let viewController = RCTPresentedViewController(), let firstResponder = currentFocusedView else {
            isViewSlidingDown = false
            return
        }
        
        if let customRootView = customRootView {
            if bottomOffset <= 0 {
                isViewSlidingDown = false
                return
            }
            
            removeOffset(firstResponder: firstResponder, rootView: customRootView)
            return
        }
        
        let rootView = getReactRootView(withRootViewController: viewController)

        if shouldCheckForAvoidSoftInputView && checkIfNestedInAvoidSoftInputView(view: firstResponder) {
            isViewSlidingDown = false
            return
        }
        
        if bottomOffset <= 0 {
            isViewSlidingDown = false
            return
        }
        
        removeOffset(firstResponder: firstResponder, rootView: rootView)
    }
    
    private func applyOffset(height: CGFloat, firstResponder: UIView, rootView: UIView) {
        if let scrollView = findScrollViewForFirstResponder(view: firstResponder, rootView: rootView) {
            applyOffsetToScrollView(height: height, firstResponder: firstResponder, scrollView: scrollView, rootView: rootView)
            return
        }

        applyOffsetToRootView(height: height, firstResponder: firstResponder, rootView: rootView)
    }
    
    private func applyOffsetToRootView(height: CGFloat, firstResponder: UIView, rootView: UIView) {
        guard let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil) else {
            return
        }
        
        var bottomSafeInset: CGFloat = 0
        if #available(iOS 11.0, tvOS 11.0, *) {
            bottomSafeInset = rootView.safeAreaInsets.bottom
        }
        
        let firstResponderDistanceToBottom = UIScreen.main.bounds.size.height - (firstResponderPosition.y + firstResponder.frame.height) - bottomSafeInset
        
        bottomOffset = max(height - firstResponderDistanceToBottom, 0) + avoidOffset
        
        if (bottomOffset <= 0) {
            isViewSlidingUp = false
            return
        }
        
        fakeShowAnimationView.alpha = 0.0
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(0)
        }
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.showAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
            self.showAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(self.fakeShowAnimationView)
            self.fakeShowAnimationView.alpha = 1.0
            
            self.hideAnimationTimer.isPaused = true
            self.hideAnimationTimer.invalidate()
            self.currentFakeHideAnimationViewAlpha = 1.0
            
            rootView.frame.origin.y -= self.bottomOffset
        } completion: { isCompleted in
            self.showAnimationTimer.isPaused = true
            self.showAnimationTimer.invalidate()
            self.currentFakeShowAnimationViewAlpha = 0.0
            self.fakeShowAnimationView.alpha = 0.0
            self.fakeShowAnimationView.removeFromSuperview()
            
            self.isViewSlidingUp = false
            self.isViewSlidedUp = true
        }
    }
    
    private func applyOffsetToScrollView(height: CGFloat, firstResponder: UIView, scrollView: UIScrollView, rootView: UIView) {
        guard let firstResponderPosition = firstResponder.superview?.convert(firstResponder.frame.origin, to: nil) else {
            return
        }
        
        var bottomSafeInset: CGFloat = 0
        if #available(iOS 11.0, tvOS 11.0, *) {
            bottomSafeInset = rootView.safeAreaInsets.bottom
        }
        
        let firstResponderDistanceToBottom = UIScreen.main.bounds.size.height - (firstResponderPosition.y + firstResponder.frame.height) - bottomSafeInset
        
        guard let scrollViewPosition = scrollView.superview?.convert(scrollView.frame.origin, to: nil) else {
            return
        }
        
        let scrollViewDistanceToBottom = UIScreen.main.bounds.size.height - (scrollViewPosition.y + scrollView.frame.height) - bottomSafeInset
        
        let scrollToOffset = min(max(height - firstResponderDistanceToBottom, 0), (firstResponderPosition.y - scrollViewPosition.y))
        
        bottomOffset = max(height - scrollViewDistanceToBottom, 0) + avoidOffset
        
        if (bottomOffset <= 0) {
            isViewSlidingUp = false
            return
        }

        fakeShowAnimationView.alpha = 0.0
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(0)
        }
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.showAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
            self.showAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(self.fakeShowAnimationView)
            self.fakeShowAnimationView.alpha = 1.0
            
            self.hideAnimationTimer.isPaused = true
            self.hideAnimationTimer.invalidate()
            self.currentFakeHideAnimationViewAlpha = 1.0
            
            var newContentInset = scrollView.contentInset
            newContentInset.bottom = max(self.bottomOffset, scrollView.contentInset.bottom)
            var newScrollIndicatorInsets = scrollView.scrollIndicatorInsets
            newScrollIndicatorInsets.bottom = max(self.bottomOffset, scrollView.scrollIndicatorInsets.bottom)
            self.scrollContentInset = scrollView.contentInset
            self.scrollIndicatorInsets = scrollView.scrollIndicatorInsets
            scrollView.contentInset = newContentInset
            scrollView.scrollIndicatorInsets = newScrollIndicatorInsets
            scrollView.contentOffset = CGPoint(x: scrollView.contentOffset.x, y: scrollView.contentOffset.y + scrollToOffset)
        } completion: { isCompleted in
            self.showAnimationTimer.isPaused = true
            self.showAnimationTimer.invalidate()
            self.currentFakeShowAnimationViewAlpha = 0.0
            self.fakeShowAnimationView.alpha = 0.0
            self.fakeShowAnimationView.removeFromSuperview()
            
            self.isViewSlidingUp = false
            self.isViewSlidedUp = true
        }
    }
    
    private func removeOffset(firstResponder: UIView, rootView: UIView) {
        if let scrollView = findScrollViewForFirstResponder(view: firstResponder, rootView: rootView) {
            removeOffsetFromScrollView(scrollView: scrollView, rootView: rootView)
            return
        }
        
        removeOffsetFromRootView(rootView: rootView)
    }
    
    private func removeOffsetFromRootView(rootView: UIView) {
        fakeHideAnimationView.alpha = 1.0
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(currentAppliedOffset)
        }
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.hideAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
            self.hideAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(self.fakeHideAnimationView)
            self.fakeHideAnimationView.alpha = 0.0
            
            self.showAnimationTimer.isPaused = true
            self.showAnimationTimer.invalidate()
            self.currentFakeShowAnimationViewAlpha = 0.0
            
            rootView.frame.origin.y += self.bottomOffset
        } completion: { isCompleted in
            self.hideAnimationTimer.isPaused = true
            self.hideAnimationTimer.invalidate()
            self.currentFakeHideAnimationViewAlpha = 1.0
            self.fakeHideAnimationView.alpha = 1.0
            self.fakeHideAnimationView.removeFromSuperview()
            
            self.isViewSlidedUp = false
            self.isViewSlidingDown = false
            self.currentFocusedView = nil
            self.bottomOffset = 0
            self.currentAppliedOffset = 0
        }
    }
    
    private func removeOffsetFromScrollView(scrollView: UIScrollView, rootView: UIView) {
        fakeHideAnimationView.alpha = 1.0
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(currentAppliedOffset)
        }
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.hideAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
            self.hideAnimationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(self.fakeHideAnimationView)
            self.fakeHideAnimationView.alpha = 0.0
            
            self.showAnimationTimer.isPaused = true
            self.showAnimationTimer.invalidate()
            self.currentFakeShowAnimationViewAlpha = 0.0
            
            scrollView.contentInset = self.scrollContentInset
            scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
            self.scrollContentInset = .zero
            self.scrollIndicatorInsets = .zero
        } completion: { isCompleted in
            self.hideAnimationTimer.isPaused = true
            self.hideAnimationTimer.invalidate()
            self.currentFakeHideAnimationViewAlpha = 1.0
            self.fakeHideAnimationView.alpha = 1.0
            self.fakeHideAnimationView.removeFromSuperview()
            
            self.isViewSlidedUp = false
            self.isViewSlidingDown = false
            self.currentFocusedView = nil
            self.bottomOffset = 0
            self.currentAppliedOffset = 0
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
        if currentFakeHideAnimationViewAlpha * self.bottomOffset > currentAppliedOffset {
            return
        }

        currentAppliedOffset = currentFakeHideAnimationViewAlpha * self.bottomOffset
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(currentAppliedOffset)
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
        if currentFakeShowAnimationViewAlpha * self.bottomOffset < currentAppliedOffset {
            return
        }

        currentAppliedOffset = currentFakeShowAnimationViewAlpha * self.bottomOffset
        if let onOffsetChanged = onOffsetChanged {
            onOffsetChanged(currentAppliedOffset)
        }
    }
    #endif
}
