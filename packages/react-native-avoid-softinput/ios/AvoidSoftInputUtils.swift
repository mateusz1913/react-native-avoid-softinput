extension UIView {
    func checkIfNestedInAvoidSoftInputView() -> Bool {
        guard let superview = superview else {
            return false
        }

        if superview is AvoidSoftInputView {
            return true
        }

        return superview.checkIfNestedInAvoidSoftInputView()
    }

    func findFirstResponder() -> UIView? {
        if isFirstResponder {
            return self
        }

        if !subviews.isEmpty {
            for subview in subviews {
                if let v = subview.findFirstResponder() {
                    return v
                }
            }
        }

        return nil
    }

    func findScrollViewForFirstResponderInRootView(_ rootView: UIView) -> UIScrollView? {
        guard let superview = superview else {
            return nil
        }
        if superview == rootView {
            return nil
        }
        if superview is UIScrollView {
            if let scrollView = superview as? UIScrollView {
                // IGNORE HORIZONTAL SCROLL VIEW
                if scrollView.frame.width >= scrollView.contentSize.width {
                    return scrollView
                }
            }
        }
        return superview.findScrollViewForFirstResponderInRootView(rootView)
    }

    func getDistanceToBottomEdgeInRootView(_ rootView: UIView) -> CGFloat? {
        guard let position = getPositionInSuperview() else {
            return nil
        }
        let edgeY = position.y + frame.height
        return rootView.getScreenHeight() - edgeY - rootView.getSafeBottomInset()
    }

    func getPositionInSuperview() -> CGPoint? {
        return superview?.convert(frame.origin, to: nil)
    }

    #if os(iOS)
        func getSafeBottomInset() -> CGFloat {
            if #available(iOS 11.0, *) {
                return self.safeAreaInsets.bottom
            }

            return 0
        }
    #endif

    func getScreenHeight() -> CGFloat {
        if #available(iOS 13.0, *) {
            if let screen = self.window?.windowScene?.screen {
                return screen.bounds.size.height
            }
        }
        return UIScreen.main.bounds.size.height
    }
}

enum ReactNativeAvoidSoftInputLogger {
    @inlinable
    static func log(
        level: RCTLogLevel,
        message: String,
        _ file: String = #file,
        _ lineNumber: Int = #line,
        _ function: String = #function
    ) {
        #if DEBUG
            RCTDefaultLogFunction(
                level,
                RCTLogSource.native,
                file,
                lineNumber as NSNumber,
                "AvoidSoftInput.\(function): \(message)"
            )
        #endif
    }
}
