#import "AvoidSoftInput.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "rnavoidsoftinput.h"

@interface AvoidSoftInput () <NativeAvoidSoftInputModuleSpec>
@end
#endif

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
__attribute__((objc_runtime_name("_TtC28react_native_avoid_softinput18AvoidSoftInputImpl")))
@interface AvoidSoftInputImpl : NSObject
@property (nonatomic) BOOL hasListeners;
@property (nonatomic, copy) void (^_Nullable onAppliedOffsetChangedEvent)(CGFloat);
@property (nonatomic, copy) void (^_Nullable onHeightChangedEvent)(CGFloat);
@property (nonatomic, copy) void (^_Nullable onHiddenEvent)(CGFloat);
@property (nonatomic, copy) void (^_Nullable onShownEvent)(CGFloat);
- (nonnull instancetype)init;
- (void)setEnabled:(BOOL)enabled;
- (void)setAvoidOffset:(NSNumber *_Nonnull)offset;
- (void)setEasing:(NSString *_Nonnull)easing;
- (void)setHideAnimationDelay:(NSNumber *_Nonnull)delay;
- (void)setHideAnimationDuration:(NSNumber *_Nonnull)duration;
- (void)setShowAnimationDelay:(NSNumber *_Nonnull)delay;
- (void)setShowAnimationDuration:(NSNumber *_Nonnull)duration;
@end

// MARK: Implementation

@implementation AvoidSoftInput {
  AvoidSoftInputImpl *moduleImpl;
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[
    AvoidSoftInputConstants.softInputAppliedOffsetChanged,
    AvoidSoftInputConstants.softInputHeightChanged,
    AvoidSoftInputConstants.softInputHidden,
    AvoidSoftInputConstants.softInputShown
  ];
}

- (void)startObserving
{
  moduleImpl.hasListeners = YES;
}

- (void)stopObserving
{
  moduleImpl.hasListeners = NO;
}

- (instancetype)init
{
  if (self = [super init]) {
    moduleImpl = [AvoidSoftInputImpl new];
    __weak __typeof__(self) weakSelf = self;
    moduleImpl.onAppliedOffsetChangedEvent = ^void(CGFloat offset) {
      __typeof__(self) strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf sendEventWithName:AvoidSoftInputConstants.softInputAppliedOffsetChanged
                                 body:@{AvoidSoftInputConstants.softInputAppliedOffsetKey : @(offset)}];
      }
    };
    moduleImpl.onHeightChangedEvent = ^void(CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf sendEventWithName:AvoidSoftInputConstants.softInputHeightChanged
                                 body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
      }
    };
    moduleImpl.onHiddenEvent = ^void(CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf sendEventWithName:AvoidSoftInputConstants.softInputHidden
                                 body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
      }
    };
    moduleImpl.onShownEvent = ^void(CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      if (strongSelf) {
        [strongSelf sendEventWithName:AvoidSoftInputConstants.softInputShown
                                 body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
      }
    };
  }
  return self;
}

RCT_EXPORT_MODULE(AvoidSoftInput)

// MARK: Exposed methods

RCT_EXPORT_METHOD(setEnabled : (BOOL)enabled)
{
  [moduleImpl setEnabled:enabled];
}

RCT_EXPORT_METHOD(setAvoidOffset
                  :
#ifdef RCT_NEW_ARCH_ENABLED
                  (double)offset
#else
                  (nonnull NSNumber *)offset
#endif
)
{
  [moduleImpl setAvoidOffset:
#ifdef RCT_NEW_ARCH_ENABLED
                  [NSNumber numberWithDouble:offset]
#else
                  offset
#endif
  ];
}

RCT_EXPORT_METHOD(setEasing : (nonnull NSString *)easing)
{
  [moduleImpl setEasing:easing];
}

RCT_EXPORT_METHOD(setHideAnimationDelay : (nonnull NSNumber *)delay)
{
  [moduleImpl setHideAnimationDelay:delay];
}

RCT_EXPORT_METHOD(setHideAnimationDuration : (nonnull NSNumber *)duration)
{
  [moduleImpl setHideAnimationDuration:duration];
}

RCT_EXPORT_METHOD(setShowAnimationDelay : (nonnull NSNumber *)delay)
{
  [moduleImpl setShowAnimationDelay:delay];
}

RCT_EXPORT_METHOD(setShowAnimationDuration : (nonnull NSNumber *)duration)
{
  [moduleImpl setShowAnimationDuration:duration];
}

- (void)setAdjustNothing
{
  // NOOP - Android-only
}

- (void)setAdjustPan
{
  // NOOP - Android-only
}

- (void)setAdjustResize
{
  // NOOP - Android-only
}

- (void)setAdjustUnspecified
{
  // NOOP - Android-only
}

- (void)setDefaultAppSoftInputMode
{
  // NOOP - Android-only
}

- (void)setShouldMimicIOSBehavior:(BOOL)shouldMimic
{
  // NOOP - Android-only
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeAvoidSoftInputModuleSpecJSI>(params);
}
#endif

@end
