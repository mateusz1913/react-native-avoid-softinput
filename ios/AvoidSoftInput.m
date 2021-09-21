#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AvoidSoftInput, RCTEventEmitter)

RCT_EXTERN_METHOD(setEnabled:(BOOL)enabled)
RCT_EXTERN_METHOD(setAvoidOffset:(nonnull NSNumber)offset)
RCT_EXTERN_METHOD(setEasing:(nonnull NSString)easing)
RCT_EXTERN_METHOD(setHideAnimationDelay:(nonnull NSNumber)delay)
RCT_EXTERN_METHOD(setHideAnimationDuration:(nonnull NSNumber)duration)
RCT_EXTERN_METHOD(setShowAnimationDelay:(nonnull NSNumber)delay)
RCT_EXTERN_METHOD(setShowAnimationDuration:(nonnull NSNumber)duration)

@end
