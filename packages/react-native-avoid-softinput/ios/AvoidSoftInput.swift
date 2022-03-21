import UIKit

@objc(AvoidSoftInput)
class AvoidSoftInput: RCTEventEmitter {
    // MARK: LOCAL VARIABLES
    private let SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"
    private let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"

    private let SOFT_INPUT_APPLIED_OFFSET_CHANGED = "softInputAppliedOffsetChanged"
    private let SOFT_INPUT_HEIGHT_CHANGED = "softInputHeightChanged"
    private let SOFT_INPUT_HIDDEN = "softInputHidden"
    private let SOFT_INPUT_SHOWN = "softInputShown"

    private var hasListeners = false
    private var manager = AvoidSoftInputManager()
    private var previousSoftInputHeight: CGFloat = 0
    private var previousScreenHeight: CGFloat = 0

    // MARK: RCTEVENTEMITTER METHODS
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func supportedEvents() -> [String]! {
        return [SOFT_INPUT_SHOWN, SOFT_INPUT_HIDDEN, SOFT_INPUT_APPLIED_OFFSET_CHANGED, SOFT_INPUT_HEIGHT_CHANGED]
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
        previousScreenHeight = UIScreen.main.bounds.height
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputHeightWillChange(notification:)), name: UIResponder.keyboardWillChangeFrameNotification, object: nil)
        manager.setOnOffsetChanged { changedOffset in
            self.sendAppliedOffsetChangedEvent(changedOffset)
        }
        manager.setShouldCheckForAvoidSoftInputView(true)
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
        #if os(iOS)
        manager.setIsEnabled(enabled.boolValue)
        #endif
    }

    @objc(setAvoidOffset:)
    func setAvoidOffset(offset: NSNumber) {
        #if os(iOS)
        manager.setAvoidOffset(offset)
        #endif
    }
    
    @objc(setEasing:)
    func setEasing(easing: NSString) {
        #if os(iOS)
        manager.setEasing(easing)
        #endif
    }
    
    @objc(setHideAnimationDelay:)
    func setHideAnimationDelay(delay: NSNumber?) {
        #if os(iOS)
        manager.setHideAnimationDelay(delay)
        #endif
    }
    
    @objc(setHideAnimationDuration:)
    func setHideAnimationDuration(duration: NSNumber?) {
        #if os(iOS)
        manager.setHideAnimationDuration(duration)
        #endif
    }
    
    @objc(setShowAnimationDelay:)
    func setShowAnimationDelay(delay: NSNumber?) {
        #if os(iOS)
        manager.setShowAnimationDelay(delay)
        #endif
    }
    
    @objc(setShowAnimationDuration:)
    func setShowAnimationDuration(duration: NSNumber?) {
        #if os(iOS)
        manager.setShowAnimationDuration(duration)
        #endif
    }
    
    #if os(iOS)
    // MARK: NOTIFICATION CALLBACKS
    @objc func softInputWillHide(notification: NSNotification) {
        sendHiddenEvent(0)
    }
    
    @objc func softInputWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }

        let softInputDetectedHeight = softInputSize.cgRectValue.height
        sendShownEvent(softInputDetectedHeight)
    }
    
    @objc func softInputHeightWillChange(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let newSoftInputUserInfo = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }
        
        let screenHeight = UIScreen.main.bounds.height
        // notification frame width info is not reliable, so instead compare new and previous screen height values
        let isOrientationChange = screenHeight != previousScreenHeight

        let newSoftInputCGRectValue = newSoftInputUserInfo.cgRectValue
        let newSoftInputHeight = screenHeight - newSoftInputCGRectValue.origin.y
        // notification begin frame info is not reliable, so instead get previous cached value
        let oldSoftInputHeight = previousSoftInputHeight
        
        if newSoftInputHeight < 0 || oldSoftInputHeight < 0 {
            return
        }
        previousSoftInputHeight = newSoftInputHeight
        previousScreenHeight = screenHeight
        
        sendHeightChangedEvent(newSoftInputHeight)
        
        manager.softInputHeightWillChange(from: oldSoftInputHeight, to: newSoftInputHeight, isOrientationChange: isOrientationChange)
    }
    
    // MARK: EVENTS
    private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_APPLIED_OFFSET_CHANGED, body: [SOFT_INPUT_APPLIED_OFFSET_KEY: offset])
        }
    }
    
    private func sendHeightChangedEvent(_ height: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_HEIGHT_CHANGED, body: [SOFT_INPUT_HEIGHT_KEY: height])
        }
    }

    private func sendHiddenEvent(_ height: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_HIDDEN, body: [SOFT_INPUT_HEIGHT_KEY: height])
        }
    }

    private func sendShownEvent(_ height: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_SHOWN, body: [SOFT_INPUT_HEIGHT_KEY: height])
        }
    }
    #endif
}
