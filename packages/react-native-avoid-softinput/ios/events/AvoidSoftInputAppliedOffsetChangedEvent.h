#import <Foundation/Foundation.h>
#import <React/RCTEventDispatcherProtocol.h>

@class AvoidSoftInputConstants;

@interface AvoidSoftInputAppliedOffsetChangedEvent : NSObject<RCTEvent>

- (nonnull instancetype)initWithReactTag:(NSNumber * _Nonnull)reactTag
                                  offset:(CGFloat)offset;

@end

