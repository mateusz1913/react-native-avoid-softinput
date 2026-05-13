#import "AvoidSoftInput.h"
#import "AvoidSoftInputConstants.h"
#import "AvoidSoftInputManager.h"
#import "RCTConvert+UIViewAnimationOptions.h"

@interface AvoidSoftInput () <AvoidSoftInputManagerDelegate>
@end

// MARK: Implementation

@implementation AvoidSoftInput {
    AvoidSoftInputManager *managerInstance;
    BOOL hasListeners;
}

+ (NSString *)moduleName
{
    return @"AvoidSoftInput";
}

+ (BOOL)requiresMainQueueSetup
{
    return NO;
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
    @synchronized(self) {
        if (managerInstance == nil) {
            managerInstance = [AvoidSoftInputManager new];
        }

        return managerInstance;
    }
}

// MARK: Init

- (instancetype)init
{
    if (self = [super init]) {
        dispatch_async(dispatch_get_main_queue(), ^{
          self.manager.delegate = self;
          [self.manager initializeHandlers];
        });
    }
    return self;
}

- (void)dealloc
{
    [self.manager cleanupHandlers];
    self.manager.delegate = nil;
    managerInstance = nil;
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

- (void)setEnabled:(BOOL)enabled
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setIsEnabled:enabled];
    });
}

- (void)setAvoidOffset:(double)offset
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setAvoidOffset:offset];
    });
}

- (void)setEasing:(nonnull NSString *)easing
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setEasing:[RCTConvert UIViewAnimationOptions:easing]];
    });
}

- (void)setHideAnimationDelay:(nonnull NSNumber *)delay
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setHideAnimationDelay:delay];
    });
}

- (void)setHideAnimationDuration:(nonnull NSNumber *)duration
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setHideAnimationDuration:duration];
    });
}

- (void)setShowAnimationDelay:(nonnull NSNumber *)delay
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setShowAnimationDelay:delay];
    });
}

- (void)setShowAnimationDuration:(nonnull NSNumber *)duration
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setShowAnimationDuration:duration];
    });
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

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeAvoidSoftInputModuleSpecJSI>(params);
}

@end
