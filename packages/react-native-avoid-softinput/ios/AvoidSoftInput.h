#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@class AvoidSoftInputConstants;
@class AvoidSoftInputManager;
@protocol AvoidSoftInputManagerDelegate;

@interface AvoidSoftInput : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, readonly, strong) AvoidSoftInputManager *_Nonnull manager;

@end
