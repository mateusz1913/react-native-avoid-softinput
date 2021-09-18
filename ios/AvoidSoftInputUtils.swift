func findFirstResponder(view: UIView) -> UIView? {
    if view.isFirstResponder {
        return view
    }

    if view.subviews.count > 0 {
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
    switch superview {
    case is UIScrollView:
        return superview as? UIScrollView
    default:
        return findScrollViewForFirstResponder(view: superview, rootView: rootView)
    }
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

func computeKeyboardOffset(keyboardHeight: CGFloat, firstResponder: UIView, containerView: UIView, rootView: UIView) -> CGFloat? {
    guard let inputPosition = firstResponder.superview?.convert(firstResponder.frame, to: containerView) else {
        return nil
    }
    
    var topSafeInset: CGFloat = 0
    if #available(iOS 11.0, tvOS 11.0, *) {
        topSafeInset = rootView.safeAreaInsets.top
    }
    let keyboardOffset = keyboardHeight - (rootView.frame.height - containerView.frame.height - containerView.frame.origin.y)
    let shouldAvoidSoftInput = (inputPosition.origin.y + inputPosition.height + topSafeInset) >= (containerView.frame.height + containerView.frame.origin.y) - keyboardOffset
    
    if !shouldAvoidSoftInput {
        return nil
    }
    
    return keyboardOffset
}
