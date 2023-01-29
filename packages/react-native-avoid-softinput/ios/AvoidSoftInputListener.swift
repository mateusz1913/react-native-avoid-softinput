import Foundation

public protocol AvoidSoftInputListenerDelegate: AnyObject {
    func onHeightChanged(oldSoftInputHeight: CGFloat, newSoftInputHeight: CGFloat, isOrientationChange: Bool)
    func onHide(_ height: CGFloat)
    func onShow(_ height: CGFloat)
}

public class AvoidSoftInputListener {
    public weak var delegate: AvoidSoftInputListenerDelegate?

    private var previousSoftInputHeight: CGFloat = 0
    private var previousScreenHeight: CGFloat = 0

    public func initializeHandlers() {
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
        #endif
    }

    public func cleanupHandlers() {
        #if os(iOS)
            NotificationCenter.default.removeObserver(self)
        #endif
    }

    #if os(iOS)

        // MARK: Notification callbacks

        @objc func softInputWillHide(notification: NSNotification) {
            delegate?.onHide(0)
        }

        @objc func softInputWillShow(notification: NSNotification) {
            guard
                let userInfo = notification.userInfo,
                let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue
            else {
                return
            }

            let softInputDetectedHeight = softInputSize.cgRectValue.height
            delegate?.onShow(softInputDetectedHeight)
        }

        @objc func softInputHeightWillChange(notification: NSNotification) {
            guard
                let userInfo = notification.userInfo,
                let newSoftInputUserInfo = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue,
                let reactRootView = AvoidSoftInputObjCPPUtils.getReactRootView()
            else {
                return
            }

            let screenHeight = reactRootView.getScreenHeight()
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

            delegate?.onHeightChanged(
                oldSoftInputHeight: oldSoftInputHeight,
                newSoftInputHeight: newSoftInputHeight,
                isOrientationChange: isOrientationChange
            )
        }
    #endif
}
