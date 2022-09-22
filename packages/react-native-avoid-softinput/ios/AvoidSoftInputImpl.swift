import UIKit

@objc public class AvoidSoftInputImpl: NSObject {
    // MARK: Private variables

    private var manager = AvoidSoftInputManager()
    private var previousSoftInputHeight: CGFloat = 0
    private var previousScreenHeight: CGFloat = 0

    // MARK: Public variables

    @objc public var hasListeners = false
    @objc public var onAppliedOffsetChangedEvent: ((CGFloat) -> Void)?
    @objc public var onHeightChangedEvent: ((CGFloat) -> Void)?
    @objc public var onHiddenEvent: ((CGFloat) -> Void)?
    @objc public var onShownEvent: ((CGFloat) -> Void)?

    // MARK: Constructors

    override public init() {
        super.init()
        previousScreenHeight = UIScreen.main.bounds.height
        #if os(iOS)
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(softInputWillShow(notification:)),
                name: UIResponder.keyboardWillShowNotification,
                object: nil
            )
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(softInputWillHide(notification:)),
                name: UIResponder.keyboardWillHideNotification,
                object: nil
            )
            NotificationCenter.default.addObserver(
                self,
                selector: #selector(softInputHeightWillChange(notification:)),
                name: UIResponder.keyboardWillChangeFrameNotification,
                object: nil
            )
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

    // MARK: Public methods

    @objc(setEnabled:)
    public func setEnabled(enabled: ObjCBool) {
        #if os(iOS)
            manager.setIsEnabled(enabled.boolValue)
        #endif
    }

    @objc(setAvoidOffset:)
    public func setAvoidOffset(offset: NSNumber) {
        #if os(iOS)
            manager.setAvoidOffset(offset)
        #endif
    }

    @objc(setEasing:)
    public func setEasing(easing: NSString) {
        #if os(iOS)
            manager.setEasing(easing)
        #endif
    }

    @objc(setHideAnimationDelay:)
    public func setHideAnimationDelay(delay: NSNumber) {
        #if os(iOS)
            manager.setHideAnimationDelay(delay)
        #endif
    }

    @objc(setHideAnimationDuration:)
    public func setHideAnimationDuration(duration: NSNumber) {
        #if os(iOS)
            manager.setHideAnimationDuration(duration)
        #endif
    }

    @objc(setShowAnimationDelay:)
    public func setShowAnimationDelay(delay: NSNumber) {
        #if os(iOS)
            manager.setShowAnimationDelay(delay)
        #endif
    }

    @objc(setShowAnimationDuration:)
    public func setShowAnimationDuration(duration: NSNumber) {
        #if os(iOS)
            manager.setShowAnimationDuration(duration)
        #endif
    }

    #if os(iOS)

        // MARK: Notification callbacks

        @objc func softInputWillHide(notification: NSNotification) {
            sendHiddenEvent(0)
        }

        @objc func softInputWillShow(notification: NSNotification) {
            guard
                let userInfo = notification.userInfo,
                let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue
            else {
                return
            }

            let softInputDetectedHeight = softInputSize.cgRectValue.height
            sendShownEvent(softInputDetectedHeight)
        }

        @objc func softInputHeightWillChange(notification: NSNotification) {
            guard
                let userInfo = notification.userInfo,
                let newSoftInputUserInfo = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue
            else {
                return
            }

            let screenHeight = UIScreen.main.bounds.height
            // notification frame width info is not reliable, so instead compare new and previous screen height values
            let isOrientationChange = screenHeight != previousScreenHeight

            let newSoftInputCGRectValue = newSoftInputUserInfo.cgRectValue
            let newSoftInputHeight = screenHeight - newSoftInputCGRectValue.origin.y
            // notification begin frame info is not reliable, so instead get previous cached value
            let oldSoftInputHeight = previousSoftInputHeight

            if newSoftInputHeight < 0 || oldSoftInputHeight < 0 {
                return
            }
            previousSoftInputHeight = newSoftInputHeight
            previousScreenHeight = screenHeight

            sendHeightChangedEvent(newSoftInputHeight)

            manager.softInputHeightWillChange(
                from: oldSoftInputHeight,
                to: newSoftInputHeight,
                isOrientationChange: isOrientationChange
            )
        }

        // MARK: Events

        private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
            if hasListeners, let onAppliedOffsetChangedEvent = onAppliedOffsetChangedEvent {
                onAppliedOffsetChangedEvent(offset)
            }
        }

        private func sendHeightChangedEvent(_ height: CGFloat) {
            if hasListeners, let onHeightChangedEvent = onHeightChangedEvent {
                onHeightChangedEvent(height)
            }
        }

        private func sendHiddenEvent(_ height: CGFloat) {
            if hasListeners, let onHiddenEvent = onHiddenEvent {
                onHiddenEvent(height)
            }
        }

        private func sendShownEvent(_ height: CGFloat) {
            if hasListeners, let onShownEvent = onShownEvent {
                onShownEvent(height)
            }
        }
    #endif
}
