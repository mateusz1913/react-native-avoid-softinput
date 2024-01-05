
#import <UIKit/UIKit.h>

@protocol AvoidSoftInputAnimatorDelegate <NSObject>

- (void)onOffsetChanged:(CGFloat)offset;

@end

@interface AvoidSoftInputAnimator : NSObject

@property (nonatomic, weak) id<AvoidSoftInputAnimatorDelegate> _Nullable delegate;
@property (readonly, getter=isAnimationRunning) BOOL animationRunning;

- (void)beginAnimationWithInitialOffset:(CGFloat)initialOffset addedOffset:(CGFloat)addedOffset;

- (void)setupAnimationTimersWithRootView:(UIView *_Nonnull)rootView;

- (void)completeAnimationWithNewBottomOffset:(CGFloat)newBottomOffset
              shouldSaveCurrentAppliedOffset:(BOOL)shouldSaveCurrentAppliedOffset;

- (void)cleanup;

@end
