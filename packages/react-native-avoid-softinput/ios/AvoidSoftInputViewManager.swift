@objc(AvoidSoftInputViewManager)
class AvoidSoftInputViewManager: RCTViewManager {
    @objc override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func view() -> RCTView {
        return AvoidSoftInputView(frame: CGRect.zero, eventDispatcher: self.bridge.eventDispatcher())
    }
}
