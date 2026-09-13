#import <React/RCTEventEmitter.h>

@class AvoidSoftInputConstants;
@class AvoidSoftInputManager;
@protocol AvoidSoftInputManagerDelegate;

@interface AvoidSoftInput : RCTEventEmitter

@property (nonatomic, readonly, strong) AvoidSoftInputManager *_Nonnull manager;

@end
