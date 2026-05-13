#import <React/RCTEventEmitter.h>

#import "rnavoidsoftinput.h"

@class AvoidSoftInputConstants;
@class AvoidSoftInputManager;
@protocol AvoidSoftInputManagerDelegate;

@interface AvoidSoftInput : RCTEventEmitter <NativeAvoidSoftInputModuleSpec>

@property (nonatomic, readonly, strong) AvoidSoftInputManager *_Nonnull manager;

@end
