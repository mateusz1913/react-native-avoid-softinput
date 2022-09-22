#import "AvoidSoftInputObjCPPUtils.h"

#import <React/RCTRootView.h>
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
+ (UIView *_Nonnull)getReactRootViewWithRootViewController:(UIViewController *)viewController
{
  if ([
        viewController.view isKindOfClass:[
#ifdef RCT_NEW_ARCH_ENABLED
        RCTFabricSurfaceHostingProxyRootView
#else
        RCTRootView
#endif
        class]])
    {
    return viewController.view.subviews[0];
  }

  return viewController.view;
}

@end
