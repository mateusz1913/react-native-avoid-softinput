class AvoidSoftInputView: RCTView {
    // MARK: LOCAL VARIABLES
    private var eventDispatcher: RCTEventDispatcherProtocol
    private var manager = AvoidSoftInputManager()
    private var coalescingKey: UInt16 = 0
    private var isInitialized = false

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

    // MARK: CONSTRUCTORS
    init(frame: CGRect, eventDispatcher: RCTEventDispatcherProtocol) {
        self.eventDispatcher = eventDispatcher
        super.init(frame: frame)
        #if os(iOS)
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
        if superview == nil && newSuperview != nil {
            initializeHandlers()
        } else if superview != nil && newSuperview == nil {
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
        if (isInitialized) {
            return
        }

        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillShow(notification:)), name: UIResponder.keyboardWillShowNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(softInputWillHide(notification:)), name: UIResponder.keyboardWillHideNotification, object: nil)
        isInitialized = true
    }
    
    private func cleanupHandlers() {
        if (!isInitialized) {
            return
        }

        NotificationCenter.default.removeObserver(self)
        isInitialized = false
    }
    
    @objc private func softInputWillHide(notification: NSNotification) {
        sendHiddenEvent(0)
        
        manager.softInputWillHide(customRootView: self)
    }
    
    @objc private func softInputWillShow(notification: NSNotification) {
        guard let userInfo = notification.userInfo, let softInputSize = userInfo[UIResponder.keyboardFrameEndUserInfoKey] as? NSValue else {
            return
        }

        let softInputDetectedHeight = softInputSize.cgRectValue.height
        sendShownEvent(softInputDetectedHeight)

        manager.softInputWillShow(height: softInputDetectedHeight, customRootView: self)
    }
    
    // MARK: EVENTS
    private func sendAppliedOffsetChangedEvent(_ offset: CGFloat) {
        self.eventDispatcher.send(AvoidSoftInputAppliedOffsetChangedEvent(reactTag: self.reactTag, offset: offset))
    }

    private func sendHiddenEvent(_ height: CGFloat) {
        coalescingKey += 1
        self.eventDispatcher.send(AvoidSoftInputHiddenEvent(reactTag: self.reactTag, height: height, coalescingKey: coalescingKey))
    }

    private func sendShownEvent(_ height: CGFloat) {
        coalescingKey += 1
        self.eventDispatcher.send(AvoidSoftInputShownEvent(reactTag: self.reactTag, height: height, coalescingKey: coalescingKey))
    }
    #endif
}
