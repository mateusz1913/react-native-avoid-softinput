#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface UIViewController (AvoidSoftInputUtils)

- (UIView *)getReactRootView;

@end

@interface UIView (AvoidSoftInputUtils)

- (BOOL)checkIfNestedInAvoidSoftInputView;
- (UIView *_Nullable)findFirstResponder;
- (UIScrollView *_Nullable)findScrollViewForFirstResponderInRootView:(UIView *)rootView;
- (CGFloat)getDistanceToBottomEdgeInRootView:(UIView *)rootView;
- (CGPoint)getPositionInSuperview;
- (CGFloat)getScreenHeight;

@end
