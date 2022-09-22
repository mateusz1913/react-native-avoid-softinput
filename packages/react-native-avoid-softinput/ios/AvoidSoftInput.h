#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

// Does not work https://github.com/CocoaPods/CocoaPods/issues/10544
//@class AvoidSoftInputConstants;
//@class AvoidSoftInputImpl;

@interface AvoidSoftInput : RCTEventEmitter <RCTBridgeModule>

@end
