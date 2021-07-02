import UIKit

@objc(AvoidSoftinput)
class AvoidSoftinput: RCTEventEmitter {
    let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    let SOFT_INPUT_SHOWN = "softInputShown"
    let SOFT_INPUT_HIDDEN = "softInputHidden"
    
    var isEnabled: Bool = false
    var isRootViewSlideUp: Bool = false
    var scrollContentInset: UIEdgeInsets = UIEdgeInsets.zero
    var scrollIndicatorInsets: UIEdgeInsets = UIEdgeInsets.zero
    var rootViewOriginY: CGFloat? = nil
    var focusedInput: UIView? = nil
    var hasListeners = false
    
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
    
    @objc func keyboardWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo else {
            return
        }
        guard let keyboardSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }
        
        let keyboardFrame = keyboardSize.cgRectValue
        
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_SHOWN, body: [SOFT_INPUT_HEIGHT_KEY: keyboardFrame.height])
        }
        
        if isEnabled == false {
            return
        }
        
        guard let viewController = RCTPresentedViewController() else {
            return
        }

        guard let focusedInput = findFirstResponder(view: viewController.view) else {
            return
        }
        
        self.focusedInput = focusedInput

        guard let positionInRootView = focusedInput.superview?.convert(focusedInput.frame, to: viewController.view) else {
            return
        }
        
        let shouldAvoidSoftInput = (positionInRootView.origin.y + positionInRootView.height) > viewController.view.frame.height - keyboardFrame.height
        
        if rootViewOriginY == nil {
            rootViewOriginY = viewController.view.frame.origin.y
        }
        
        if shouldAvoidSoftInput {
            UIView.animate(withDuration: 0.66, delay: 0.3) {
                if let scrollView = self.findScrollViewForFirstResponder(view: focusedInput) {
                    let contentInsets = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: keyboardFrame.height, right: 0.0)
                    self.scrollContentInset = scrollView.contentInset
                    self.scrollIndicatorInsets = scrollView.scrollIndicatorInsets
                    scrollView.contentInset = contentInsets
                    scrollView.scrollIndicatorInsets = contentInsets
                } else {
                    if let rootViewOriginY = self.rootViewOriginY {
                        viewController.view.frame.origin.y = rootViewOriginY - keyboardFrame.height
                    }
                }
            }
        }
    }
    
    @objc func keyboardWillHide(notification: NSNotification) {
        guard let userInfo = notification.userInfo else {
            return
        }
        guard let keyboardSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }
        
        let keyboardFrame = keyboardSize.cgRectValue
        
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_HIDDEN, body: [SOFT_INPUT_HEIGHT_KEY: 0])
        }

        if isEnabled == false {
            return
        }

        guard let viewController = RCTPresentedViewController(), let focusedInput = focusedInput else {
            return
        }
        
        UIView.animate(withDuration: 0.22) {
            if let scrollView = self.findScrollViewForFirstResponder(view: focusedInput) {
                scrollView.contentInset = self.scrollContentInset
                scrollView.scrollIndicatorInsets = self.scrollIndicatorInsets
                self.scrollContentInset = UIEdgeInsets.zero
                self.scrollIndicatorInsets = UIEdgeInsets.zero
            } else {
                viewController.view.frame.origin.y += keyboardFrame.height
            }
        } completion: { isCompleted in
            self.rootViewOriginY = nil
            self.focusedInput = nil
        }
    }
    
    override init() {
        super.init()
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(keyboardWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    override func startObserving() {
        hasListeners = true
    }
    
    override func stopObserving() {
        hasListeners = false
    }
    
    func findFirstResponder(view: UIView) -> UIView? {
        if view.isFirstResponder {
            return view
        }

        if view.subviews.count > 0 {
            for subview in view.subviews {
                if let v = findFirstResponder(view: subview) {
                    return v
                }
            }
        }

        return nil
    }
    
    func findScrollViewForFirstResponder(view: UIView) -> UIScrollView? {
        guard let superview = view.superview else {
            return nil
        }
        switch superview {
        case is UIScrollView:
            return superview as? UIScrollView
        default:
            return findScrollViewForFirstResponder(view: superview)
        }
    }
}
