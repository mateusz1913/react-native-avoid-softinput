@objc public class AvoidSoftInputView: RCTView {
    // MARK: Private variables

    private var manager = AvoidSoftInputManager()
    private var coalescingKey: UInt16 = 0
    private var isInitialized = false
    private var previousSoftInputHeight: CGFloat = 0
    private var previousScreenHeight: CGFloat = 0

    // MARK: Public variables

    @objc public var onAppliedOffsetChangedEvent: ((AvoidSoftInputView, CGFloat) -> Void)?
    @objc public var onHeightChangedEvent: ((AvoidSoftInputView, CGFloat) -> Void)?
    @objc public var onHiddenEvent: ((AvoidSoftInputView, CGFloat) -> Void)?
    @objc public var onShownEvent: ((AvoidSoftInputView, CGFloat) -> Void)?

    @objc public var onSoftInputHidden: RCTDirectEventBlock?
    @objc public var onSoftInputShown: RCTDirectEventBlock?
    @objc public var onSoftInputAppliedOffsetChange: RCTDirectEventBlock?
    @objc public var onSoftInputHeightChange: RCTDirectEventBlock?

    // MARK: Props

    @objc public func setAvoidOffset(_ offset: NSNumber?) {
        #if os(iOS)
            manager.setAvoidOffset(offset ?? 0)
        #endif
    }

    @objc public func setEasing(_ easing: NSString?) {
        #if os(iOS)
            manager.setEasing(easing ?? "linear")
        #endif
    }

    @objc public func setEnabled(_ enabled: ObjCBool) {
        #if os(iOS)
            manager.setIsEnabled(enabled.boolValue)
        #endif
    }

    @objc public func setHideAnimationDelay(_ delay: NSNumber?) {
        #if os(iOS)
            manager.setHideAnimationDelay(delay)
        #endif
    }

    @objc public func setHideAnimationDuration(_ duration: NSNumber?) {
        #if os(iOS)
            manager.setHideAnimationDuration(duration)
        #endif
    }

    @objc public func setShowAnimationDelay(_ delay: NSNumber?) {
        #if os(iOS)
            manager.setShowAnimationDelay(delay)
        #endif
    }

    @objc public func setShowAnimationDuration(_ duration: NSNumber?) {
        #if os(iOS)
            manager.setShowAnimationDuration(duration)
        #endif
    }

    // MARK: Constructors

    override public init(frame: CGRect) {
        super.init(frame: frame)
        initializeHandlers()
        previousScreenHeight = UIScreen.main.bounds.height
        #if os(iOS)
            manager.setIsEnabled(true)
            manager.setOnOffsetChanged { changedOffset in
                self.sendAppliedOffsetChangedEvent(changedOffset)
            }
            manager.setShouldCheckForAvoidSoftInputView(false)
        #endif
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    deinit {
        cleanupHandlers()
    }

    // MARK: UIView

    override public func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if superview == nil, newSuperview != nil {
            initializeHandlers()
        } else if superview != nil, newSuperview == nil {
            cleanupHandlers()
        }
    }

    // MARK: Private methods

    private func initializeHandlers() {
        #if os(iOS)
            if isInitialized {
                return
            }

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
            isInitialized = true
        #endif
    }

    private func cleanupHandlers() {
        #if os(iOS)
            if !isInitialized {
                return
            }

            NotificationCenter.default.removeObserver(self)
            isInitialized = false
        #endif
    }

    #if os(iOS)

        // MARK: Notification callbacks

        @objc private func softInputWillHide(notification: NSNotification) {
            sendHiddenEvent(0)
        }

        @objc private func softInputWillShow(notification: NSNotification) {
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
                isOrientationChange: isOrientationChange,
                customRootView: self
            )
        }

        // MARK: Events

        private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
            #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
                // In new arch handle events inside AvoidSoftInputViewComponentView class
                if let onAppliedOffsetChangedEvent = onAppliedOffsetChangedEvent {
                    onAppliedOffsetChangedEvent(self, offset)
                }
            #else
                // In old arch just use RCTEventDispatcher directly
                if let eventDispatcher = RCTBridge.current().eventDispatcher() {
                    eventDispatcher.send(
                        AvoidSoftInputAppliedOffsetChangedEvent(reactTag: reactTag, offset: offset)
                    )
                }
            #endif
        }

        private func sendHeightChangedEvent(_ height: CGFloat) {
            #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
                // In new arch handle events inside AvoidSoftInputViewComponentView class
                if let onHeightChangedEvent = onHeightChangedEvent {
                    onHeightChangedEvent(self, height)
                }
            #else
                // In old arch just use RCTEventDispatcher directly
                if let eventDispatcher = RCTBridge.current().eventDispatcher() {
                    coalescingKey += 1
                    eventDispatcher.send(
                        AvoidSoftInputHeightChangedEvent(
                            reactTag: reactTag,
                            height: height,
                            coalescingKey: coalescingKey
                        )
                    )
                }
            #endif
        }

        private func sendHiddenEvent(_ height: CGFloat) {
            #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
                // In new arch handle events inside AvoidSoftInputViewComponentView class
                if let onHiddenEvent = onHiddenEvent {
                    onHiddenEvent(self, height)
                }
            #else
                // In old arch just use RCTEventDispatcher directly
                if let eventDispatcher = RCTBridge.current().eventDispatcher() {
                    coalescingKey += 1
                    eventDispatcher.send(
                        AvoidSoftInputHiddenEvent(
                            reactTag: reactTag,
                            height: height,
                            coalescingKey: coalescingKey
                        )
                    )
                }
            #endif
        }

        private func sendShownEvent(_ height: CGFloat) {
            #if AVOID_SOFTINPUT_NEW_ARCH_ENABLED
                // In new arch handle events inside AvoidSoftInputViewComponentView class
                if let onShownEvent = onShownEvent {
                    onShownEvent(self, height)
                }
            #else
                // In old arch just use RCTEventDispatcher directly
                if let eventDispatcher = RCTBridge.current().eventDispatcher() {
                    coalescingKey += 1
                    eventDispatcher.send(
                        AvoidSoftInputShownEvent(
                            reactTag: reactTag,
                            height: height,
                            coalescingKey: coalescingKey
                        )
                    )
                }
            #endif
        }
    #endif
}
