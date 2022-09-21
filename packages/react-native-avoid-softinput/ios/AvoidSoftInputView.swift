class AvoidSoftInputView: RCTView {
    // MARK: LOCAL VARIABLES

    private var eventDispatcher: RCTEventDispatcherProtocol
    private var manager = AvoidSoftInputManager()
    private var coalescingKey: UInt16 = 0
    private var isInitialized = false
    private var previousSoftInputHeight: CGFloat = 0
    private var previousScreenHeight: CGFloat = 0

    // MARK: PROPS

    @objc var avoidOffset: NSNumber = 0 {
        didSet {
            #if os(iOS)
                manager.setAvoidOffset(avoidOffset)
            #endif
        }
    }

    @objc var easing: NSString = "linear" {
        didSet {
            #if os(iOS)
                manager.setEasing(easing)
            #endif
        }
    }

    @objc var enabled: ObjCBool = true {
        didSet {
            #if os(iOS)
                manager.setIsEnabled(enabled.boolValue)
            #endif
        }
    }

    @objc var hideAnimationDelay: NSNumber? {
        didSet {
            #if os(iOS)
                manager.setHideAnimationDelay(hideAnimationDelay)
            #endif
        }
    }

    @objc var hideAnimationDuration: NSNumber? {
        didSet {
            #if os(iOS)
                manager.setHideAnimationDuration(hideAnimationDuration)
            #endif
        }
    }

    @objc var showAnimationDelay: NSNumber? {
        didSet {
            #if os(iOS)
                manager.setShowAnimationDelay(showAnimationDelay)
            #endif
        }
    }

    @objc var showAnimationDuration: NSNumber? {
        didSet {
            #if os(iOS)
                manager.setShowAnimationDuration(showAnimationDuration)
            #endif
        }
    }

    @objc var onSoftInputHidden: RCTDirectEventBlock?
    @objc var onSoftInputShown: RCTDirectEventBlock?
    @objc var onSoftInputAppliedOffsetChange: RCTDirectEventBlock?
    @objc var onSoftInputHeightChange: RCTDirectEventBlock?

    // MARK: CONSTRUCTORS

    init(frame: CGRect, eventDispatcher: RCTEventDispatcherProtocol) {
        self.eventDispatcher = eventDispatcher
        super.init(frame: frame)
        #if os(iOS)
            previousScreenHeight = UIScreen.main.bounds.height
            initializeHandlers()
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

    override func willMove(toSuperview newSuperview: UIView?) {
        #if os(iOS)
            if superview == nil, newSuperview != nil {
                initializeHandlers()
            } else if superview != nil, newSuperview == nil {
                cleanupHandlers()
            }
        #endif
    }

    deinit {
        #if os(iOS)
            cleanupHandlers()
        #endif
    }

    #if os(iOS)

        // MARK: NOTIFICATION METHODS

        private func initializeHandlers() {
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
        }

        private func cleanupHandlers() {
            if !isInitialized {
                return
            }

            NotificationCenter.default.removeObserver(self)
            isInitialized = false
        }

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

        // MARK: EVENTS

        private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
            eventDispatcher.send(AvoidSoftInputAppliedOffsetChangedEvent(reactTag: reactTag, offset: offset))
        }

        private func sendHeightChangedEvent(_ height: CGFloat) {
            coalescingKey += 1
            eventDispatcher.send(
                AvoidSoftInputHeightChangedEvent(
                    reactTag: reactTag,
                    height: height,
                    coalescingKey: coalescingKey
                )
            )
        }

        private func sendHiddenEvent(_ height: CGFloat) {
            coalescingKey += 1
            eventDispatcher.send(
                AvoidSoftInputHiddenEvent(
                    reactTag: reactTag,
                    height: height,
                    coalescingKey: coalescingKey
                )
            )
        }

        private func sendShownEvent(_ height: CGFloat) {
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
