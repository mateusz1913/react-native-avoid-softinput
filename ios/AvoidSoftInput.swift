import UIKit

@objc(AvoidSoftInput)
class AvoidSoftInput: RCTEventEmitter {
    let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    let SOFT_INPUT_SHOWN = "softInputShown"
    let SOFT_INPUT_HIDDEN = "softInputHidden"
    
    var isEnabled: Bool = false
    var isRootViewSlideUp: Bool = false
    var isRootViewSlidingDown: Bool = false
    var isRootViewSlidingUp: Bool = false
    var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    var rootViewOriginY: CGFloat? = nil
    var focusedInput: UIView? = nil
    var hasListeners = false
    var bottomOffset: CGFloat = 0
    var _avoidOffset: CGFloat = 0
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func supportedEvents() -> [String]! {
        return [SOFT_INPUT_SHOWN, SOFT_INPUT_HIDDEN]
    }
    
    @objc(setEnabled:)
    func setEnabled(enabled: ObjCBool) {
        isEnabled = enabled.boolValue
    }
    
    @objc(setAvoidOffset:)
    func setAvoidOffset(offset: NSNumber) {
        _avoidOffset = CGFloat(offset.floatValue)
    }
    
    #if os(iOS)
    @objc func keyboardWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let keyboardSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }
        let keyboardFrame = keyboardSize.cgRectValue

        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_SHOWN, body: [SOFT_INPUT_HEIGHT_KEY: keyboardFrame.height])
        }

        if isRootViewSlideUp || isRootViewSlidingUp || isEnabled == false {
            return
        }

        isRootViewSlidingUp = true
        
        guard let viewController = RCTPresentedViewController(), let focusedInput = findFirstResponder(view: viewController.view), let rootView = viewController.view else {
            isRootViewSlidingUp = false
            return
        }
        
        if checkIfNestedInAvoidSoftInputView(view: focusedInput) {
            isRootViewSlidingUp = false
            return
        }
        
        if rootViewOriginY == nil {
            rootViewOriginY = rootView.frame.origin.y
        }
        self.focusedInput = focusedInput

        guard let keyboardOffset = computeKeyboardOffset(keyboardHeight: keyboardFrame.height, firstResponder: focusedInput, containerView: rootView, rootView: rootView) else {
            isRootViewSlidingUp = false
            return
        }
        
        self.bottomOffset = keyboardOffset + _avoidOffset
        UIView.animate(withDuration: 0.66, delay: 0.3, options: [.beginFromCurrentState]) {
            if let scrollView = findScrollViewForFirstResponder(view: focusedInput, rootView: rootView) {
                let contentInsets = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: self.bottomOffset, right: 0.0)
                self.scrollContentInset = scrollView.contentInset
                self.scrollIndicatorInsets = scrollView.scrollIndicatorInsets
                scrollView.contentInset = contentInsets
                scrollView.scrollIndicatorInsets = contentInsets
            } else {
                if let rootViewOriginY = self.rootViewOriginY {
                    rootView.frame.origin.y = rootViewOriginY - self.bottomOffset
                }
            }
        } completion: { isCompleted in
            self.isRootViewSlidingUp = false
            self.isRootViewSlideUp = true
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_HIDDEN, body: [SOFT_INPUT_HEIGHT_KEY: 0])
        }
        
        if (!isRootViewSlideUp && !isRootViewSlidingUp) || isRootViewSlidingDown || isEnabled == false {
            return
        }
        
        isRootViewSlidingDown = true

        guard let viewController = RCTPresentedViewController(), let focusedInput = focusedInput, let rootView = viewController.view else {
            isRootViewSlidingDown = false
            return
        }
        
        if checkIfNestedInAvoidSoftInputView(view: focusedInput) {
            isRootViewSlidingDown = false
            return
        }

        UIView.animate(withDuration: 0.22, delay: 0, options: [.beginFromCurrentState]) {
            if let scrollView = findScrollViewForFirstResponder(view: focusedInput, rootView: rootView) {
                scrollView.contentInset = self.scrollContentInset
                scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
                self.scrollContentInset = UIEdgeInsets.zero
                self.scrollIndicatorInsets = UIEdgeInsets.zero
            } else {
                rootView.frame.origin.y += self.bottomOffset
            }
        } completion: { isCompleted in
            self.isRootViewSlidingDown = false
            self.rootViewOriginY = nil
            self.focusedInput = nil
            self.isRootViewSlideUp = false
        }
    }
    #endif
    
    override init() {
        super.init()
        #if os(iOS)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
        #endif
    }
    
    deinit {
        #if os(iOS)
        NotificationCenter.default.removeObserver(self)
        #endif
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
    }
}
