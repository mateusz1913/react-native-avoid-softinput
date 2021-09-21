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

func computeSoftInputOffset(softInputHeight: CGFloat, firstResponder: UIView, containerView: UIView, rootView: UIView) -> CGFloat? {
    guard let inputPosition = firstResponder.superview?.convert(firstResponder.frame, to: rootView) else {
        return nil
    }
    
    var containerPosition = containerView.frame
    if containerView != rootView {
        if let position = containerView.superview?.convert(containerView.frame, to: rootView) {
            containerPosition = position
        }
    }

    var topSafeInset: CGFloat = 0
    if #available(iOS 11.0, tvOS 11.0, *) {
        topSafeInset = rootView.safeAreaInsets.top
    }

    let softInputOffset = softInputHeight - (rootView.frame.height - containerPosition.height - containerPosition.origin.y)
    let shouldAvoidSoftInput = (inputPosition.origin.y + inputPosition.height + topSafeInset) >= (containerPosition.height + containerPosition.origin.y) - softInputOffset

    if !shouldAvoidSoftInput {
        return nil
    }

    return softInputOffset
}

func applyOffset(focusedInput: UIView, rootView: UIView, bottomOffset: CGFloat) -> MaybeScrollInsets {
    if let scrollView = findScrollViewForFirstResponder(view: focusedInput, rootView: rootView) {
        let contentInsets = UIEdgeInsets.init(top: 0.0, left: 0.0, bottom: bottomOffset, right: 0.0)
        let scrollContentInset = scrollView.contentInset
        let scrollIndicatorInsets = scrollView.scrollIndicatorInsets
        scrollView.contentInset = contentInsets
        scrollView.scrollIndicatorInsets = contentInsets
        return MaybeScrollInsets(scrollContentInset: scrollContentInset, scrollIndicatorInsets: scrollIndicatorInsets)
    }

    rootView.frame.origin.y -= bottomOffset
    return MaybeScrollInsets()
}

func removeOffset(focusedInput: UIView, rootView: UIView, bottomOffset: CGFloat, scrollContentInset: UIEdgeInsets, scrollIndicatorInsets: UIEdgeInsets) -> MaybeScrollInsets {
    if let scrollView = findScrollViewForFirstResponder(view: focusedInput, rootView: rootView) {
        scrollView.contentInset = scrollContentInset
        scrollView.scrollIndicatorInsets = scrollIndicatorInsets
        return MaybeScrollInsets(scrollContentInset: UIEdgeInsets.zero, scrollIndicatorInsets: UIEdgeInsets.zero)
    }
    
    rootView.frame.origin.y += bottomOffset
    return MaybeScrollInsets()
}

struct MaybeScrollInsets {
    var scrollContentInset: UIEdgeInsets?
    var scrollIndicatorInsets: UIEdgeInsets?
}
