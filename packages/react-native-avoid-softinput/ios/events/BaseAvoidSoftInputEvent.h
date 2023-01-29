#import <Foundation/Foundation.h>
#import <React/RCTEventDispatcherProtocol.h>

@class AvoidSoftInputConstants;

@interface BaseAvoidSoftInputEvent : NSObject<RCTEvent>

- (nonnull instancetype)initWithReactTag:(NSNumber * _Nonnull)reactTag
                                  height:(CGFloat)height;

@end
