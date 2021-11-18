class BaseAvoidSoftInputEvent: NSObject, RCTEvent {
    var viewTag: NSNumber!
    var eventName: String!
    var coalescingKey: UInt16 = 0
    
    var height: CGFloat = 0
    let SOFT_INPUT_HEIGHT_KEY = "softInputHeight"
    
    func canCoalesce() -> Bool {
        return false
    }
    
    func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
        return newEvent
    }
    
    static func moduleDotMethod() -> String! {
        return "RCTEventEmitter.receiveEvent"
    }
    
    func arguments() -> [Any]! {
        return [self.viewTag, RCTNormalizeInputEventName(self.eventName), [SOFT_INPUT_HEIGHT_KEY: self.height]]
    }
    
    init(reactTag: NSNumber, height: CGFloat) {
        self.viewTag = reactTag
        self.height = height
    }
}
