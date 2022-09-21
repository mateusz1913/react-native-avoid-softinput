class AvoidSoftInputHiddenEvent: BaseAvoidSoftInputEvent {
    init(reactTag: NSNumber, height: CGFloat, coalescingKey: UInt16) {
        super.init(reactTag: reactTag, height: height)
        eventName = "onSoftInputHidden"
        self.coalescingKey = coalescingKey
    }
}
