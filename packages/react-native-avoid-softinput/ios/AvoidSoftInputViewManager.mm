#import "AvoidSoftInputViewManager.h"

#if RCT_NEW_ARCH_ENABLED
#else
#import <React/UIView+React.h>
#import "AvoidSoftInputAppliedOffsetChangedEvent.h"
#import "AvoidSoftInputHeightChangedEvent.h"
#import "AvoidSoftInputHiddenEvent.h"
#import "AvoidSoftInputShownEvent.h"
#import "AvoidSoftInputView.h"

@interface AvoidSoftInputViewManager () <AvoidSoftInputViewDelegate>

@end
#endif

// MARK: Implementation

@implementation AvoidSoftInputViewManager

RCT_EXPORT_MODULE(AvoidSoftInputView)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

RCT_EXPORT_VIEW_PROPERTY(avoidOffset, double)
RCT_EXPORT_VIEW_PROPERTY(easing, NSString)
RCT_EXPORT_VIEW_PROPERTY(enabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(hideAnimationDelay, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(hideAnimationDuration, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showAnimationDelay, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showAnimationDuration, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputAppliedOffsetChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHeightChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHidden, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputShown, RCTDirectEventBlock)

#if RCT_NEW_ARCH_ENABLED
#else
- (void)onAppliedOffsetChangedEvent:(AvoidSoftInputView *)sender offset:(CGFloat)offset
{
    [self.bridge.eventDispatcher
        sendEvent:[[AvoidSoftInputAppliedOffsetChangedEvent alloc] initWithReactTag:sender.reactTag offset:offset]];
}

- (void)onHeightChangedEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    [self.bridge.eventDispatcher sendEvent:[[AvoidSoftInputHeightChangedEvent alloc] initWithReactTag:sender.reactTag
                                                                                               height:height]];
}

- (void)onHiddenEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    [self.bridge.eventDispatcher sendEvent:[[AvoidSoftInputHiddenEvent alloc] initWithReactTag:sender.reactTag
                                                                                        height:height]];
}

- (void)onShownEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    [self.bridge.eventDispatcher sendEvent:[[AvoidSoftInputShownEvent alloc] initWithReactTag:sender.reactTag
                                                                                       height:height]];
}

- (UIView *)view
{
    AvoidSoftInputView *view = [AvoidSoftInputView new];
    view.delegate = self;
    return view;
}
#endif

@end
