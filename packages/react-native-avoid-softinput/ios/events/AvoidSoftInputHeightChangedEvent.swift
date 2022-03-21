class AvoidSoftInputHeightChangedEvent: BaseAvoidSoftInputEvent {
    init(reactTag: NSNumber, height: CGFloat, coalescingKey: UInt16) {
        super.init(reactTag: reactTag, height: height)
        self.eventName = "onSoftInputHeightChange"
        self.coalescingKey = coalescingKey
    }
}
