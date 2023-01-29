#import "BaseAvoidSoftInputEvent.h"

// MARK: Swift classes in ObjC++

#import "ReactNativeAvoidSoftinput-Swift.h"

@implementation BaseAvoidSoftInputEvent {
    CGFloat eventHeight;
    NSNumber *eventReactTag;
}

- (NSString *)eventName
{
    return @"";
}

- (NSNumber *)viewTag
{
    return eventReactTag;
}

- (BOOL)canCoalesce
{
    return NO;
}

- (instancetype)initWithReactTag:(NSNumber *)reactTag height:(CGFloat)height
{
    self = [super init];
    if (self) {
        eventHeight = height;
        eventReactTag = reactTag;
    }
    return self;
}

+ (NSString *)moduleDotMethod
{
    return @"RCTEventEmitter.receiveEvent";
}

- (NSArray *)arguments
{
    return @[
        self.viewTag,
        RCTNormalizeInputEventName(self.eventName),
        @{ AvoidSoftInputConstants.softInputHeightKey: @(eventHeight) }
    ];
}

@end
