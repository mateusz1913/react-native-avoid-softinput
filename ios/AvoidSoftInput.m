#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AvoidSoftInput, RCTEventEmitter)

RCT_EXTERN_METHOD(setEnabled:(BOOL)enabled)
RCT_EXTERN_METHOD(setAvoidOffset:(nonnull NSNumber)offset)
RCT_EXTERN_METHOD(setEasing:(nonnull NSString)easing)

@end
