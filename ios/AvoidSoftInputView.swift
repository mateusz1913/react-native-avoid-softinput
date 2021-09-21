class AvoidSoftInputView: RCTView {
    // MARK: LOCAL VARIABLES
    private var eventDispatcher: RCTEventDispatcherProtocol

    #if os(iOS)
    internal var bottomOffset: CGFloat = 0
    internal var currentAppliedOffset: CGFloat = 0
    internal var currentFakeHideAnimationViewAlpha: CGFloat = 0
    internal var currentFakeShowAnimationViewAlpha: CGFloat = 0
    internal var easingOption: UIView.AnimationOptions = .curveLinear
    internal lazy var fakeHideAnimationView = UIView()
    internal lazy var fakeShowAnimationView = UIView()
    internal var focusedInput: UIView? = nil
    internal lazy var hideAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
    internal var hideDelay: Double = HIDE_ANIMATION_DELAY_IN_SECONDS
    internal var hideDuration: Double = HIDE_ANIMATION_DURATION_IN_SECONDS
    internal var isViewSlidedUp: Bool = false
    internal var isViewSlidingDown: Bool = false
    internal var isViewSlidingUp: Bool = false
    internal var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    internal var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    internal lazy var showAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
    internal var showDelay: Double = SHOW_ANIMATION_DELAY_IN_SECONDS
    internal var showDuration: Double = SHOW_ANIMATION_DURATION_IN_SECONDS

    internal var coalescingKey: UInt16 = 0
    #endif

    // MARK: PROPS
    @objc var avoidOffset: CGFloat = 0
    @objc var easing: NSString = "linear" {
        didSet {
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
    }
    @objc var hideAnimationDelay: NSNumber? {
        didSet {
            if let delay = hideAnimationDelay {
                hideDelay = delay.doubleValue / 1000
            } else {
                hideDelay = HIDE_ANIMATION_DELAY_IN_SECONDS
            }
        }
    }
    @objc var hideAnimationDuration: NSNumber? {
        didSet {
            if let duration = hideAnimationDuration {
                hideDuration = duration.doubleValue / 1000
            } else {
                hideDuration = HIDE_ANIMATION_DURATION_IN_SECONDS
            }
        }
    }
    @objc var showAnimationDelay: NSNumber? {
        didSet {
            if let delay = showAnimationDelay {
                showDelay = delay.doubleValue / 1000
            } else {
                showDelay = SHOW_ANIMATION_DELAY_IN_SECONDS
            }
        }
    }
    @objc var showAnimationDuration: NSNumber? {
        didSet {
            if let duration = showAnimationDuration {
                showDuration = duration.doubleValue / 1000
            } else {
                showDuration = SHOW_ANIMATION_DURATION_IN_SECONDS
            }
        }
    }
    @objc var onSoftInputHidden: RCTDirectEventBlock?
    @objc var onSoftInputShown: RCTDirectEventBlock?
    @objc var onSoftInputAppliedOffsetChange: RCTDirectEventBlock?

    // MARK: CONSTRUCTORS
    init(frame: CGRect, eventDispatcher: RCTEventDispatcherProtocol) {
        self.eventDispatcher = eventDispatcher
        super.init(frame: frame)
        #if os(iOS)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
        #endif
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    deinit {
        #if os(iOS)
        NotificationCenter.default.removeObserver(self)
        #endif
    }
}

#if os(iOS)
extension AvoidSoftInputView: AvoidSoftInputProtocol {
    // MARK: SOFT INPUT HIDDEN
    @objc func softInputWillHide(notification: NSNotification) {
        sendHiddenEvent(0)

        if (!isViewSlidedUp && !isViewSlidingUp) || isViewSlidingDown {
            return
        }

        isViewSlidingDown = true
        guard let focusedInput = focusedInput else {
            isViewSlidingDown = false
            return
        }

        fakeHideAnimationView.alpha = 1.0
        self.sendAppliedOffsetChangedEvent(self.currentAppliedOffset)
        UIView.animate(withDuration: hideDuration, delay: hideDelay, options: [.beginFromCurrentState, easingOption]) {
            self.scheduleHideAnimation(parentView: self)
            self.resetShowAnimation(isInterrupted: true)
            let maybeScrollInsets = removeOffset(focusedInput: focusedInput, rootView: self, bottomOffset: self.bottomOffset, scrollContentInset: self.scrollContentInset, scrollIndicatorInsets: self.scrollIndicatorInsets)
            if let scrollContentInset = maybeScrollInsets.scrollContentInset, let scrollIndicatorInsets = maybeScrollInsets.scrollIndicatorInsets {
                self.scrollContentInset = scrollContentInset
                self.scrollIndicatorInsets = scrollIndicatorInsets
            }
        } completion: { isCompleted in
            self.resetHideAnimation(isInterrupted: false)
            self.hideAnimationDidComplete()
        }
    }

    @objc func updateHideAnimation() {
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
        sendAppliedOffsetChangedEvent(currentAppliedOffset)
    }

    // MARK: SOFT INPUT SHOWN
    @objc func softInputWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }

        let softInputDetectedHeight = softInputSize.cgRectValue.height
        sendShownEvent(softInputDetectedHeight)

        if isViewSlidedUp || isViewSlidingUp {
            return
        }

        isViewSlidingUp = true
        guard let viewController = RCTPresentedViewController(), let focusedInput = findFirstResponder(view: viewController.view), let rootView = viewController.view else {
            isViewSlidingUp = false
            return
        }

        self.focusedInput = focusedInput

        guard let softInputOffset = computeSoftInputOffset(softInputHeight: softInputDetectedHeight, firstResponder: focusedInput, containerView: self, rootView: rootView) else {
            isViewSlidingUp = false
            return
        }

        bottomOffset = softInputOffset + avoidOffset
        fakeShowAnimationView.alpha = 0.0
        self.sendAppliedOffsetChangedEvent(0)
        UIView.animate(withDuration: showDuration, delay: showDelay, options: [.beginFromCurrentState, easingOption]) {
            self.scheduleShowAnimation(parentView: self)
            self.resetHideAnimation(isInterrupted: true)
            let maybeScrollInsets = applyOffset(focusedInput: focusedInput, rootView: self, bottomOffset: self.bottomOffset)
            if let scrollContentInset = maybeScrollInsets.scrollContentInset, let scrollIndicatorInsets = maybeScrollInsets.scrollIndicatorInsets {
                self.scrollContentInset = scrollContentInset
                self.scrollIndicatorInsets = scrollIndicatorInsets
            }
        } completion: { isCompleted in
            self.resetShowAnimation(isInterrupted: false)
            self.showAnimationDidComplete()
        }
    }

    @objc func updateShowAnimation() {
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
        sendAppliedOffsetChangedEvent(currentAppliedOffset)
    }

    // MARK: EVENTS
    func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
        self.eventDispatcher.send(AvoidSoftInputAppliedOffsetChangedEvent(reactTag: self.reactTag, offset: offset))
    }

    func sendHiddenEvent(_ height: CGFloat) {
        coalescingKey += 1
        self.eventDispatcher.send(AvoidSoftInputHiddenEvent(reactTag: self.reactTag, height: height, coalescingKey: coalescingKey))
    }

    func sendShownEvent(_ height: CGFloat) {
        coalescingKey += 1
        self.eventDispatcher.send(AvoidSoftInputShownEvent(reactTag: self.reactTag, height: height, coalescingKey: coalescingKey))
    }
}
#endif
