#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(AvoidSoftinput, RCTEventEmitter)

RCT_EXTERN_METHOD(setEnabled:(BOOL)enabled)

@end
