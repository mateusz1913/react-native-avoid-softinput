class AvoidSoftInputHiddenEvent: BaseAvoidSoftInputEvent {
    init(reactTag: NSNumber, height: CGFloat, coalescingKey: UInt16) {
        super.init(reactTag: reactTag, height: height)
        self.eventName = "onSoftInputHidden"
        self.coalescingKey = coalescingKey
    }
}
