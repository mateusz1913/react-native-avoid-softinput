class AvoidSoftInputAppliedOffsetChangedEvent: NSObject, RCTEvent {
    // swiftlint:disable implicitly_unwrapped_optional
    var viewTag: NSNumber!
    var eventName: String = "onSoftInputAppliedOffsetChange"
    var coalescingKey: UInt16 = 0

    var offset: CGFloat = 0

    func canCoalesce() -> Bool {
        return true
    }

    // swiftlint:disable implicitly_unwrapped_optional
    func coalesce(with newEvent: RCTEvent!) -> RCTEvent! {
        return newEvent
    }

    static func moduleDotMethod() -> String! {
        return "RCTEventEmitter.receiveEvent"
    }

    func arguments() -> [Any]! {
        return [
            viewTag!,
            RCTNormalizeInputEventName(eventName)!,
            [AvoidSoftInputConstants.softInputAppliedOffsetKey: offset]
        ]
    }

    init(reactTag: NSNumber, offset: CGFloat) {
        viewTag = reactTag
        self.offset = offset
    }
}
