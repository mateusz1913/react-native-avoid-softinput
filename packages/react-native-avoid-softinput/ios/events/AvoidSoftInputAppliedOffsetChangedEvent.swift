class AvoidSoftInputAppliedOffsetChangedEvent: NSObject, RCTEvent {
    var viewTag: NSNumber!
    var eventName: String = "onSoftInputAppliedOffsetChange"
    var coalescingKey: UInt16 = 0
    
    var offset: CGFloat = 0
    let SOFT_INPUT_APPLIED_OFFSET_KEY = "appliedOffset"

    func canCoalesce() -> Bool {
        return true
    }
    
    func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
        return newEvent
    }
    
    static func moduleDotMethod() -> String! {
        return "RCTEventEmitter.receiveEvent"
    }
    
    func arguments() -> [Any]! {
        return [self.viewTag, RCTNormalizeInputEventName(self.eventName), [SOFT_INPUT_APPLIED_OFFSET_KEY: self.offset]]
    }
    
    init(reactTag: NSNumber, offset: CGFloat) {
        self.viewTag = reactTag
        self.offset = offset
    }
}
