@objc(AvoidSoftInputManagerDelegate)
public protocol AvoidSoftInputManagerDelegate {
    @objc func onOffsetChanged(_ offset: CGFloat)
    @objc func onHeightChanged(_ height: CGFloat)
    @objc func onHide(_ height: CGFloat)
    @objc func onShow(_ height: CGFloat)
}

@objc(AvoidSoftInputManager)
public class AvoidSoftInputManager: NSObject, AvoidSoftInputListenerDelegate, AvoidSoftInputAnimationHandlerDelegate {
    // MARK: Delegate

    @objc public weak var delegate: AvoidSoftInputManagerDelegate?

    @objc public weak var customView: UIView? {
        didSet {
            animationHandler.customView = customView
        }
    }

    // MARK: Private variables

    private var animationHandler = AvoidSoftInputAnimationHandler()
    private var listener = AvoidSoftInputListener()

    // MARK: Public setters

    @objc public func setAvoidOffset(_ offset: CGFloat) {
        animationHandler.avoidOffset = offset
    }

    @objc public func setEasing(_ easing: UIView.AnimationOptions) {
        animationHandler.easingOption = easing
    }

    @objc public func setIsEnabled(_ enabled: Bool) {
        animationHandler.isEnabled = enabled
    }

    @objc public func setHideAnimationDelay(_ delay: NSNumber?) {
        if let delay = delay {
            animationHandler.hideDelay = delay.doubleValue / 1000
        } else {
            animationHandler.hideDelay = AvoidSoftInputConstants.hideAnimationDelayInSeconds
        }
    }

    @objc public func setHideAnimationDuration(_ duration: NSNumber?) {
        if let duration = duration {
            animationHandler.hideDuration = duration.doubleValue / 1000
        } else {
            animationHandler.hideDuration = AvoidSoftInputConstants.hideAnimationDurationInSeconds
        }
    }

    @objc public func setShowAnimationDelay(_ delay: NSNumber?) {
        if let delay = delay {
            animationHandler.showDelay = delay.doubleValue / 1000
        } else {
            animationHandler.showDelay = AvoidSoftInputConstants.showAnimationDelayInSeconds
        }
    }

    @objc public func setShowAnimationDuration(_ duration: NSNumber?) {
        if let duration = duration {
            animationHandler.showDuration = duration.doubleValue / 1000
        } else {
            animationHandler.showDuration = AvoidSoftInputConstants.showAnimationDurationInSeconds
        }
    }

    // MARK: Init

    override public init() {
        super.init()
        animationHandler.delegate = self
        listener.delegate = self
    }

    // MARK: Public methods

    @objc public func initializeHandlers() {
        listener.initializeHandlers()
    }

    @objc public func cleanupHandlers() {
        listener.cleanupHandlers()
    }

    // MARK: Animation handler delegate implementation

    public func onOffsetChanged(_ offset: CGFloat) {
        delegate?.onOffsetChanged(offset)
    }

    // MARK: Listener delegate implementation

    public func onHide(_ height: CGFloat) {
        delegate?.onHide(height)
    }

    public func onShow(_ height: CGFloat) {
        delegate?.onShow(height)
    }

    public func onHeightChanged(oldSoftInputHeight: CGFloat, newSoftInputHeight: CGFloat, isOrientationChange: Bool) {
        delegate?.onHeightChanged(newSoftInputHeight)
        animationHandler.startAnimation(
            from: oldSoftInputHeight,
            to: newSoftInputHeight,
            withOrientationChange: isOrientationChange
        )
    }
}
