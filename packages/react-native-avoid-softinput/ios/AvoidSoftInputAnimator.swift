import UIKit

public protocol AvoidSoftInputAnimatorDelegate: AnyObject {
    func onOffsetChanged(_ offset: CGFloat)
}

public class AvoidSoftInputAnimator {
    public weak var delegate: AvoidSoftInputAnimatorDelegate?

    #if os(iOS)
        private var addedOffset: CGFloat = 0
        private lazy var animationTimer: CADisplayLink =
            CADisplayLink(target: self, selector: #selector(self.updateAnimation))
        private var currentAppliedOffset: CGFloat = 0
        private var currentFakeAnimationViewAlpha: CGFloat = 0
        private var fakeAnimationView = UIView()
        private var initialOffset: CGFloat = 0
        private var isAnimationCancelled: Bool = false
        public private(set) var isAnimationRunning: Bool = false

        public func beginAnimation(initialOffset: CGFloat, addedOffset: CGFloat) {
            isAnimationRunning = true
            fakeAnimationView.alpha = 0.0
            isAnimationCancelled = false
            self.initialOffset = initialOffset
            self.addedOffset = addedOffset
            if initialOffset + addedOffset == 0, addedOffset != 0 {
                sendOffsetChangedEvent(self.initialOffset)
            }
        }

        public func setupAnimationTimers(rootView: UIView) {
            animationTimer = CADisplayLink(target: self, selector: #selector(updateAnimation))
            animationTimer.add(to: .current, forMode: .default)
            rootView.addSubview(fakeAnimationView)
            fakeAnimationView.alpha = 1.0
        }

        public func completeAnimation(with newBottomOffset: CGFloat, shouldSaveCurrentAppliedOffset: Bool = false) {
            isAnimationRunning = false
            if isAnimationCancelled {
                return
            }
            animationTimer.isPaused = true
            animationTimer.invalidate()
            currentFakeAnimationViewAlpha = 0.0
            fakeAnimationView.alpha = 0.0
            fakeAnimationView.removeFromSuperview()

            sendOffsetChangedEvent(newBottomOffset)
            initialOffset = newBottomOffset
            addedOffset = 0

            if shouldSaveCurrentAppliedOffset {
                currentAppliedOffset = newBottomOffset
            }
        }

        public func cleanup() {
            isAnimationCancelled = true
            animationTimer.isPaused = true
            animationTimer.invalidate()
            currentFakeAnimationViewAlpha = 1.0
        }

        private func sendOffsetChangedEvent(_ offset: CGFloat) {
            delegate?.onOffsetChanged(offset)
        }

        @objc private func updateAnimation() {
            guard let currentFakeAlpha = fakeAnimationView.layer.presentation()?.opacity else {
                return
            }

            if currentFakeAnimationViewAlpha == CGFloat(currentFakeAlpha) {
                return
            }

            currentFakeAnimationViewAlpha = CGFloat(currentFakeAlpha)

            let newCurrentOffset = initialOffset + currentFakeAnimationViewAlpha * addedOffset
            if newCurrentOffset == currentAppliedOffset {
                return
            }

            currentAppliedOffset = newCurrentOffset
            sendOffsetChangedEvent(newCurrentOffset)
        }
    #endif
}
