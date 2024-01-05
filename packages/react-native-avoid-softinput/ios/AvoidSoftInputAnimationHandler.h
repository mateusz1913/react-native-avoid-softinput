#import <UIKit/UIKit.h>

#import "AvoidSoftInputAnimator.h"

@protocol AvoidSoftInputAnimationHandlerDelegate <NSObject>

- (void)onOffsetChanged:(CGFloat)offset;

@end

@interface AvoidSoftInputAnimationHandler : NSObject <AvoidSoftInputAnimatorDelegate>

@property (nonatomic, weak) id<AvoidSoftInputAnimationHandlerDelegate> _Nullable delegate;
@property (nonatomic, weak) UIView *_Nullable customView;
@property CGFloat avoidOffset;
@property UIViewAnimationOptions easingOption;
@property double hideDelay;
@property double hideDuration;
@property (getter=isEnabled) BOOL enabled;
@property double showDelay;
@property double showDuration;

- (void)onOffsetChanged:(CGFloat)offset;

- (void)startAnimationFrom:(CGFloat)from to:(CGFloat)to withOrientationChange:(BOOL)isOrientationChange;

@end
