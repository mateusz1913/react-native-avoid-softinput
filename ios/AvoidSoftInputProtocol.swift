@objc protocol AvoidSoftInputProtocol {
    // MARK: LOCAL VARIABLES
    var bottomOffset: CGFloat { get set }
    var currentAppliedOffset: CGFloat { get set }
    var currentFakeHideAnimationViewAlpha: CGFloat { get set }
    var currentFakeShowAnimationViewAlpha: CGFloat { get set }
    var fakeHideAnimationView: UIView { get set }
    var fakeShowAnimationView: UIView { get set }
    var focusedInput: UIView? { get set }
    var hideAnimationTimer: CADisplayLink { get set }
    var isViewSlidedUp: Bool { get set }
    var isViewSlidingDown: Bool { get set }
    var isViewSlidingUp: Bool { get set }
    var scrollContentInset: UIEdgeInsets { get set }
    var scrollIndicatorInsets: UIEdgeInsets { get set }
    var showAnimationTimer: CADisplayLink { get set }

    @objc optional var coalescingKey: UInt16 { get set }

    // MARK: SOFT INPUT HIDDEN
    @objc func softInputWillHide(notification: NSNotification)
    @objc func updateHideAnimation()
    
    // MARK: SOFT INPUT SHOWN
    @objc func softInputWillShow(notification: NSNotification)
    @objc func updateShowAnimation()
    
    // MARK: EVENTS
    func sendAppliedOffsetChangedEvent(_ offset: CGFloat)
    func sendHiddenEvent(_ height: CGFloat)
    func sendShownEvent(_ height: CGFloat)
}

extension AvoidSoftInputProtocol {
    // MARK: SOFT INPUT HIDDEN
    func hideAnimationDidComplete() {
        self.isViewSlidedUp = false
        self.isViewSlidingDown = false
        self.focusedInput = nil
        self.bottomOffset = 0
        self.currentAppliedOffset = 0
    }

    func resetHideAnimation(isInterrupted: Bool) {
        self.hideAnimationTimer.isPaused = true
        self.hideAnimationTimer.invalidate()
        self.currentFakeHideAnimationViewAlpha = 1.0
        if !isInterrupted {
            self.fakeHideAnimationView.alpha = 1.0
            self.fakeHideAnimationView.removeFromSuperview()
        }
    }
    
    func scheduleHideAnimation(parentView: UIView) {
        self.hideAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
        self.hideAnimationTimer.add(to: .current, forMode: .default)
        parentView.addSubview(self.fakeHideAnimationView)
        self.fakeHideAnimationView.alpha = 0.0
    }

    // MARK: SOFT INPUT SHOWN
    func resetShowAnimation(isInterrupted: Bool) {
        self.showAnimationTimer.isPaused = true
        self.showAnimationTimer.invalidate()
        self.currentFakeShowAnimationViewAlpha = 0.0
        if !isInterrupted {
            self.fakeShowAnimationView.alpha = 0.0
            self.fakeShowAnimationView.removeFromSuperview()
        }
    }

    func scheduleShowAnimation(parentView: UIView) {
        self.showAnimationTimer = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
        self.showAnimationTimer.add(to: .current, forMode: .default)
        parentView.addSubview(self.fakeShowAnimationView)
        self.fakeShowAnimationView.alpha = 1.0
    }

    func showAnimationDidComplete() {
        isViewSlidingUp = false
        isViewSlidedUp = true
    }
}
