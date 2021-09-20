import UIKit

@objc(AvoidSoftInput)
class AvoidSoftInput: RCTEventEmitter {
    // MARK: LOCAL VARIABLES
    private let SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"
    private let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"

    private let SOFT_INPUT_APPLIED_OFFSET_CHANGED = "softInputAppliedOffsetChanged"
    private let SOFT_INPUT_HIDDEN = "softInputHidden"
    private let SOFT_INPUT_SHOWN = "softInputShown"

    #if os(iOS)
    internal var bottomOffset: CGFloat = 0
    internal var currentAppliedOffset: CGFloat = 0
    internal var currentFakeHideAnimationViewAlpha: CGFloat = 0
    internal var currentFakeShowAnimationViewAlpha: CGFloat = 0
    internal lazy var fakeHideAnimationView = UIView()
    internal lazy var fakeShowAnimationView = UIView()
    internal var focusedInput: UIView? = nil
    internal lazy var hideAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateHideAnimation))
    internal var isViewSlidedUp: Bool = false
    internal var isViewSlidingDown: Bool = false
    internal var isViewSlidingUp: Bool = false
    internal var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    internal var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    internal lazy var showAnimationTimer: CADisplayLink = CADisplayLink(target: self, selector: #selector(self.updateShowAnimation))
    #endif
    
    private var avoidOffset: CGFloat = 0
    private var hasListeners = false
    private var isEnabled: Bool = false

    // MARK: RCTEVENTEMITTER METHODS
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func supportedEvents() -> [String]! {
        return [SOFT_INPUT_SHOWN, SOFT_INPUT_HIDDEN, SOFT_INPUT_APPLIED_OFFSET_CHANGED]
    }

    override func startObserving() {
        hasListeners = true
    }

    override func stopObserving() {
        hasListeners = false
    }

    // MARK: CONSTRUCTORS
    override init() {
        super.init()
        #if os(iOS)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
        #endif
    }

    deinit {
        #if os(iOS)
        NotificationCenter.default.removeObserver(self)
        #endif
    }

    // MARK: MODULE METHODS
    @objc(setEnabled:)
    func setEnabled(enabled: ObjCBool) {
        isEnabled = enabled.boolValue
    }

    @objc(setAvoidOffset:)
    func setAvoidOffset(offset: NSNumber) {
        avoidOffset = CGFloat(offset.floatValue)
    }
}

#if os(iOS)
extension AvoidSoftInput: AvoidSoftInputProtocol {    
    // MARK: SOFT INPUT HIDDEN
    @objc func softInputWillHide(notification: NSNotification) {
        sendHiddenEvent(0)

        if (!isViewSlidedUp && !isViewSlidingUp) || isViewSlidingDown || isEnabled == false {
            return
        }

        isViewSlidingDown = true
        guard let viewController = RCTPresentedViewController(), let focusedInput = focusedInput, let rootView = viewController.view else {
            isViewSlidingDown = false
            return
        }

        if checkIfNestedInAvoidSoftInputView(view: focusedInput) {
            isViewSlidingDown = false
            return
        }

        fakeHideAnimationView.alpha = 1.0
        self.sendAppliedOffsetChangedEvent(self.currentAppliedOffset)
        UIView.animate(withDuration: 0.22, delay: 0, options: [.beginFromCurrentState]) {
            self.scheduleHideAnimation(parentView: rootView)
            self.resetShowAnimation(isInterrupted: true)
            let maybeScrollInsets = removeOffset(focusedInput: focusedInput, rootView: rootView, bottomOffset: self.bottomOffset, scrollContentInset: self.scrollContentInset, scrollIndicatorInsets: self.scrollIndicatorInsets)
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

        if isViewSlidedUp || isViewSlidingUp || isEnabled == false {
            return
        }

        isViewSlidingUp = true
        guard let viewController = RCTPresentedViewController(), let focusedInput = findFirstResponder(view: viewController.view), let rootView = viewController.view else {
            isViewSlidingUp = false
            return
        }

        if checkIfNestedInAvoidSoftInputView(view: focusedInput) {
            isViewSlidingUp = false
            return
        }

        self.focusedInput = focusedInput

        guard let softInputOffset = computeSoftInputOffset(softInputHeight: softInputDetectedHeight, firstResponder: focusedInput, containerView: rootView, rootView: rootView) else {
            isViewSlidingUp = false
            return
        }

        bottomOffset = softInputOffset + avoidOffset
        fakeShowAnimationView.alpha = 0.0
        self.sendAppliedOffsetChangedEvent(0)
        UIView.animate(withDuration: 0.66, delay: 0.3, options: [.beginFromCurrentState]) {
            self.scheduleShowAnimation(parentView: rootView)
            self.resetHideAnimation(isInterrupted: true)
            let maybeScrollInsets = applyOffset(focusedInput: focusedInput, rootView: rootView, bottomOffset: self.bottomOffset)
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
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_APPLIED_OFFSET_CHANGED, body: [SOFT_INPUT_APPLIED_OFFSET_KEY: offset])
        }
    }

    func sendHiddenEvent(_ height: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_HIDDEN, body: [SOFT_INPUT_HEIGHT_KEY: height])
        }
    }

    func sendShownEvent(_ height: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_SHOWN, body: [SOFT_INPUT_HEIGHT_KEY: height])
        }
    }
}
#endif
