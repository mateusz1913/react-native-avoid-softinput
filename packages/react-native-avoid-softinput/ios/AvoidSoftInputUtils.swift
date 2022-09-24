func findFirstResponder(view: UIView) -> UIView? {
    if view.isFirstResponder {
        return view
    }

    if !view.subviews.isEmpty {
        for subview in view.subviews {
            if let v = findFirstResponder(view: subview) {
                return v
            }
        }
    }

    return nil
}

func findScrollViewForFirstResponder(view: UIView, rootView: UIView) -> UIScrollView? {
    guard let superview = view.superview else {
        return nil
    }
    if superview == rootView {
        return nil
    }
    if superview is UIScrollView {
        if let scrollView = superview as? UIScrollView {
            if scrollView.frame.width < scrollView.contentSize.width {
                // IGNORE HORIZONTAL SCROLL VIEW
                return findScrollViewForFirstResponder(view: superview, rootView: rootView)
            }
            return scrollView
        }
    }
    return findScrollViewForFirstResponder(view: superview, rootView: rootView)
}

func checkIfNestedInAvoidSoftInputView(view: UIView) -> Bool {
    guard let superview = view.superview else {
        return false
    }

    if superview is AvoidSoftInputView {
        return true
    }

    return checkIfNestedInAvoidSoftInputView(view: superview)
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
