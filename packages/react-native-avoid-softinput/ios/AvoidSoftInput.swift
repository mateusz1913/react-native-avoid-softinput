import UIKit

@objc(AvoidSoftInput)
class AvoidSoftInput: RCTEventEmitter {
    // MARK: LOCAL VARIABLES
    private let SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"
    private let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"

    private let SOFT_INPUT_APPLIED_OFFSET_CHANGED = "softInputAppliedOffsetChanged"
    private let SOFT_INPUT_HIDDEN = "softInputHidden"
    private let SOFT_INPUT_SHOWN = "softInputShown"

    private var hasListeners = false
    private var manager = AvoidSoftInputManager()

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
    @objc func softInputWillHide(notification: NSNotification) {
        sendHiddenEvent(0)
        
        manager.softInputWillHide()
    }
    
    // MARK: NOTIFICATION CALLBACKS
    @objc func softInputWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }

        let softInputDetectedHeight = softInputSize.cgRectValue.height
        sendShownEvent(softInputDetectedHeight)
        
        manager.softInputWillShow(height: softInputDetectedHeight)
    }
    
    // MARK: EVENTS
    private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
        if hasListeners {
            self.sendEvent(withName: SOFT_INPUT_APPLIED_OFFSET_CHANGED, body: [SOFT_INPUT_APPLIED_OFFSET_KEY: offset])
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
