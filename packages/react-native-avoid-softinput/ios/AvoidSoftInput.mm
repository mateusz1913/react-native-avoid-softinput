#import "AvoidSoftInput.h"

#import "AvoidSoftInputObjCPPUtils.h"
#import "RCTConvert+UIViewAnimationOptions.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import "rnavoidsoftinput.h"

@interface AvoidSoftInput () <NativeAvoidSoftInputModuleSpec>
@end
#endif

// MARK: Swift classes in ObjC++
#if __has_include("ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h")
#import "ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h"
#else
#import "ReactNativeAvoidSoftinput-Swift.h"
#endif

@interface AvoidSoftInput () <AvoidSoftInputManagerDelegate>
@end

// MARK: Implementation

@implementation AvoidSoftInput {
    AvoidSoftInputManager *managerInstance;
    BOOL hasListeners;
}

RCT_EXPORT_MODULE(AvoidSoftInput)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

// MARK: RCTEventEmitter

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
    hasListeners = YES;
}

- (void)stopObserving
{
    hasListeners = NO;
}

- (AvoidSoftInputManager *)manager
{
    if (managerInstance == nil) {
        managerInstance = [AvoidSoftInputManager new];
    }

    return managerInstance;
}

// MARK: Init

- (instancetype)init
{
    if (self = [super init]) {
        self.manager.delegate = self;
        [self.manager initializeHandlers];
    }
    return self;
}

- (void)dealloc
{
    [self.manager cleanupHandlers];
}

// MARK: AvoidSoftInputManagerDelegate

- (void)onOffsetChanged:(CGFloat)offset
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:AvoidSoftInputConstants.softInputAppliedOffsetChanged
                       body:@{AvoidSoftInputConstants.softInputAppliedOffsetKey : @(offset)}];
}

- (void)onHeightChanged:(CGFloat)height
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:AvoidSoftInputConstants.softInputHeightChanged
                       body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
}

- (void)onHide:(CGFloat)height
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:AvoidSoftInputConstants.softInputHidden
                       body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
}

- (void)onShow:(CGFloat)height
{
    if (!hasListeners) {
        return;
    }

    [self sendEventWithName:AvoidSoftInputConstants.softInputShown
                       body:@{AvoidSoftInputConstants.softInputHeightKey : @(height)}];
}

// MARK: Exposed methods

RCT_EXPORT_METHOD(setEnabled : (BOOL)enabled)
{
    [self.manager setIsEnabled:enabled];
}

RCT_EXPORT_METHOD(setAvoidOffset : (double)offset)
{
    [self.manager setAvoidOffset:offset];
}

RCT_EXPORT_METHOD(setEasing : (nonnull NSString *)easing)
{
    [self.manager setEasing:[RCTConvert UIViewAnimationOptions:easing]];
}

RCT_EXPORT_METHOD(setHideAnimationDelay : (nonnull NSNumber *)delay)
{
    [self.manager setHideAnimationDelay:delay];
}

RCT_EXPORT_METHOD(setHideAnimationDuration : (nonnull NSNumber *)duration)
{
    [self.manager setHideAnimationDuration:duration];
}

RCT_EXPORT_METHOD(setShowAnimationDelay : (nonnull NSNumber *)delay)
{
    [self.manager setShowAnimationDelay:delay];
}

RCT_EXPORT_METHOD(setShowAnimationDuration : (nonnull NSNumber *)duration)
{
    [self.manager setShowAnimationDuration:duration];
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
