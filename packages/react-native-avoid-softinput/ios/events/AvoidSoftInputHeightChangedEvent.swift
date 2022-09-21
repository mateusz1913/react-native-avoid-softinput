class AvoidSoftInputHeightChangedEvent: BaseAvoidSoftInputEvent {
    init(reactTag: NSNumber, height: CGFloat, coalescingKey: UInt16) {
        super.init(reactTag: reactTag, height: height)
        eventName = "onSoftInputHeightChange"
        self.coalescingKey = coalescingKey
    }
}
