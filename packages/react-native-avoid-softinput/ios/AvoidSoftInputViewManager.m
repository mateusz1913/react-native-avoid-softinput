#import "AvoidSoftInputViewManager.h"

#import <React/RCTView.h>

// MARK: Swift classes in ObjC++

// Does not work https://github.com/CocoaPods/CocoaPods/issues/10544
//#import "react_native_avoid_softinput-Swift.h"
__attribute__((objc_runtime_name("_TtC28react_native_avoid_softinput23AvoidSoftInputConstants")))
@interface AvoidSoftInputConstants : NSObject
+ (double)hideAnimationDelayInSeconds;
+ (double)hideAnimationDurationInSeconds;
+ (double)showAnimationDelayInSeconds;
+ (double)showAnimationDurationInSeconds;
+ (NSString *_Nonnull)softInputHeightKey;
+ (NSString *_Nonnull)softInputAppliedOffsetKey;
+ (NSString *_Nonnull)softInputAppliedOffsetChanged;
+ (NSString *_Nonnull)softInputHeightChanged;
+ (NSString *_Nonnull)softInputHidden;
+ (NSString *_Nonnull)softInputShown;
- (nonnull instancetype)init;
@end
__attribute__((objc_runtime_name("_TtC28react_native_avoid_softinput18AvoidSoftInputView")))
@interface AvoidSoftInputView : RCTView
@property (nonatomic, copy) void (^_Nullable onAppliedOffsetChangedEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onHeightChangedEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onHiddenEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onShownEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputHidden;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputShown;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputAppliedOffsetChange;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputHeightChange;
- (void)setAvoidOffset:(NSNumber *_Nullable)offset;
- (void)setEasing:(NSString *_Nullable)easing;
- (void)setEnabled:(BOOL)enabled;
- (void)setHideAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setHideAnimationDuration:(NSNumber *_Nullable)duration;
- (void)setShowAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setShowAnimationDuration:(NSNumber *_Nullable)duration;
- (nonnull instancetype)initWithFrame:(CGRect)frame;
- (void)willMoveToSuperview:(UIView *_Nullable)newSuperview;
@end

// MARK: Implementation

@implementation AvoidSoftInputViewManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(avoidOffset, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(easing, NSString)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(hideAnimationDelay, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(hideAnimationDuration, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showAnimationDelay, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showAnimationDuration, NSNumber)

RCT_EXPORT_VIEW_PROPERTY(onSoftInputAppliedOffsetChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHeightChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHidden, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputShown, RCTDirectEventBlock)

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (UIView *)view
{
  return [AvoidSoftInputView new];
}

@end
