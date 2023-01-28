#import "AvoidSoftInputObjCPPUtils.h"

#import <React/RCTRootView.h>
#import <React/RCTUtils.h>
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#endif

@implementation AvoidSoftInputObjCPPUtils

/**
 * Method returns first subview of root view in React Native app, which will be the view that will have translation
 * applied;
 *
 * It's the first subview and not root view itself, because applying translation directly to the root view will result
 * in black area under the keyboard
 *
 * In case, we have to handle <Modal /> component, simply return view of presented view controller
 */
+ (UIView *_Nullable)getReactRootView
{
    UIViewController *_Nullable presentedViewController = RCTPresentedViewController();

    if (presentedViewController == nil) {
        return nil;
    }

    if ([
        presentedViewController.view isKindOfClass:[
#ifdef RCT_NEW_ARCH_ENABLED
        RCTFabricSurfaceHostingProxyRootView
#else
        RCTRootView
#endif
        class]]
        && presentedViewController.view.subviews.count > 0)
    {
        return presentedViewController.view.subviews[0];
    }

    return presentedViewController.view;
}

@end
