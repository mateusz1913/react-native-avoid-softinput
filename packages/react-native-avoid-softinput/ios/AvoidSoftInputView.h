#import <React/RCTView.h>

@class AvoidSoftInputManager;
@class AvoidSoftInputView;

@protocol AvoidSoftInputViewDelegate

- (void)onAppliedOffsetChangedEvent:(AvoidSoftInputView *_Nonnull)sender offset:(CGFloat)offset;
- (void)onHeightChangedEvent:(AvoidSoftInputView *_Nonnull)sender height:(CGFloat)height;
- (void)onHiddenEvent:(AvoidSoftInputView *_Nonnull)sender height:(CGFloat)height;
- (void)onShownEvent:(AvoidSoftInputView *_Nonnull)sender height:(CGFloat)height;

@end

@interface AvoidSoftInputView : RCTView

@property (nonatomic, weak) id<AvoidSoftInputViewDelegate> _Nullable delegate;
@property (nonatomic, readonly, strong) AvoidSoftInputManager *_Nonnull manager;

@property (nonatomic, assign) double avoidOffset;
@property (nonatomic, copy) NSString *_Nullable easing;
@property (nonatomic, assign) BOOL enabled;
@property (nonatomic, copy) NSNumber *_Nullable hideAnimationDelay;
@property (nonatomic, copy) NSNumber *_Nullable hideAnimationDuration;
@property (nonatomic, copy) NSNumber *_Nullable showAnimationDelay;
@property (nonatomic, copy) NSNumber *_Nullable showAnimationDuration;

- (nonnull instancetype)initWithFrame:(CGRect)frame;

@end
