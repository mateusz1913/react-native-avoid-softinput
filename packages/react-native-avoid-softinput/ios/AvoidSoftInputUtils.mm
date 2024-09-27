#if RCT_NEW_ARCH_ENABLED
#include <React/RCTSurfaceHostingProxyRootView.h>
#else
#include <React/RCTRootView.h>
#endif

#import "AvoidSoftInputUtils.h"

#if RCT_NEW_ARCH_ENABLED
#import "AvoidSoftInputViewComponentView.h"
#else
#import "AvoidSoftInputView.h"
#endif

@implementation UIViewController (AvoidSoftInputUtils)

/**
 * Method returns first subview of root view in React Native app, which will be the view that will have translation
 * applied;
 *
 * It's the first subview and not root view itself, because applying translation directly to the root view will result
 * in black area under the keyboard
 *
 * In case, we have to handle <Modal /> component, simply return view of presented view controller
 */
- (UIView *)getReactRootView
{
    BOOL isRootView = NO;
#if RCT_NEW_ARCH_ENABLED
    isRootView = [self.view isKindOfClass:[RCTSurfaceHostingProxyRootView class]];
#else
    isRootView = [self.view isKindOfClass:[RCTRootView class]];
#endif

    if (isRootView && self.view.subviews.count > 0) {
        return self.view.subviews[0];
    }

    return self.view;
}

@end

@implementation UIView (AvoidSoftInputUtils)

- (BOOL)checkIfNestedInAvoidSoftInputView
{
    if (self.superview == nil) {
        return false;
    }

    if ([self.superview
#if RCT_NEW_ARCH_ENABLED
            isKindOfClass:[AvoidSoftInputViewComponentView class]
#else
            isKindOfClass:[AvoidSoftInputView class]
#endif
    ]) {
        return true;
    }

    return [self.superview checkIfNestedInAvoidSoftInputView];
}

- (UIView *_Nullable)findFirstResponder
{
    if (self.isFirstResponder) {
        return self;
    }

    for (UIView *subview in self.subviews) {
        UIView *maybeFirstResponder = [subview findFirstResponder];
        if (maybeFirstResponder != nil) {
            return maybeFirstResponder;
        }
    }

    return nil;
}

- (UIScrollView *_Nullable)findScrollViewForFirstResponderInRootView:(UIView *)rootView
{
    if (self.superview == nil) {
        return nil;
    }

    if (self.superview == rootView) {
        return nil;
    }

    if ([self.superview isKindOfClass:[UIScrollView class]]) {
        UIScrollView *scrollView = (UIScrollView *)self.superview;
        // IGNORE HORIZONTAL SCROLL VIEW
        if (scrollView.frame.size.width >= scrollView.contentSize.width) {
            return scrollView;
        }
    }

    return [self.superview findScrollViewForFirstResponderInRootView:rootView];
}

- (CGFloat)getDistanceToBottomEdgeInRootView:(UIView *)rootView
{
    CGPoint position = [self getPositionInSuperview];
    CGFloat edgeY = position.y + self.frame.size.height;
    return [rootView getScreenHeight] - edgeY - rootView.safeAreaInsets.bottom;
}

- (CGPoint)getPositionInSuperview
{
    return [self.superview convertPoint:self.frame.origin toView:nil];
}

- (CGFloat)getScreenHeight
{
    if (@available(iOS 13, *)) {
        UIWindowScene *windowScene = self.window.windowScene;
        if (windowScene != nil) {
            return windowScene.screen.bounds.size.height;
        }
    }
    return [UIScreen mainScreen].bounds.size.height;
}

@end
