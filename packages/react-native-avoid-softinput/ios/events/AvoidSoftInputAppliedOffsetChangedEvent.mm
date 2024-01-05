#import "AvoidSoftInputAppliedOffsetChangedEvent.h"
#import "AvoidSoftInputConstants.h"

@implementation AvoidSoftInputAppliedOffsetChangedEvent {
    CGFloat eventOffset;
    NSNumber *eventReactTag;
}

- (NSString *)eventName
{
    return @"onSoftInputAppliedOffsetChange";
}

- (NSNumber *)viewTag
{
    return eventReactTag;
}

- (uint16_t)coalescingKey
{
    return 0;
}

- (BOOL)canCoalesce
{
    return YES;
}

- (instancetype)initWithReactTag:(NSNumber *)reactTag offset:(CGFloat)offset
{
    self = [super init];
    if (self) {
        eventOffset = offset;
        eventReactTag = reactTag;
    }
    return self;
}

+ (NSString *)moduleDotMethod
{
    return @"RCTEventEmitter.receiveEvent";
}

- (id<RCTEvent>)coalesceWithEvent:(id<RCTEvent>)newEvent
{
    return newEvent;
}

- (NSArray *)arguments
{
    return @[
        self.viewTag,
        RCTNormalizeInputEventName(self.eventName),
        @{ AvoidSoftInputConstants.softInputAppliedOffsetKey: @(eventOffset) }
    ];
}

@end
