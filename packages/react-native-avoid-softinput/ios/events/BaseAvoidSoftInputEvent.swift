class BaseAvoidSoftInputEvent: NSObject, RCTEvent {
    // swiftlint:disable implicitly_unwrapped_optional
    var viewTag: NSNumber!
    // swiftlint:disable implicitly_unwrapped_optional
    var eventName: String!
    var coalescingKey: UInt16 = 0

    var height: CGFloat = 0

    func canCoalesce() -> Bool {
        return false
    }

    // swiftlint:disable implicitly_unwrapped_optional
    func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
        return newEvent
    }

    static func moduleDotMethod() -> String! {
        return "RCTEventEmitter.receiveEvent"
    }

    func arguments() -> [Any]! {
        return [viewTag!, RCTNormalizeInputEventName(eventName)!, [AvoidSoftInputConstants.softInputHeightKey: height]]
    }

    init(reactTag: NSNumber, height: CGFloat) {
        viewTag = reactTag
        self.height = height
    }
}
