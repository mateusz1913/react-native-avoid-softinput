#import "AvoidSoftInputViewManager.h"

#import "AvoidSoftInputAppliedOffsetChangedEvent.h"
#import "AvoidSoftInputHeightChangedEvent.h"
#import "AvoidSoftInputHiddenEvent.h"
#import "AvoidSoftInputShownEvent.h"
#import "AvoidSoftInputView.h"

#import <React/RCTConvert.h>
#import <React/UIView+React.h>
#import "RCTConvert+UIViewAnimationOptions.h"

// MARK: Swift classes in ObjC++
#if __has_include("ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h")
#import "ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h"
#else
#import "ReactNativeAvoidSoftinput-Swift.h"
#endif

@interface AvoidSoftInputViewManager () <AvoidSoftInputViewDelegate>

@end

// MARK: Implementation

@implementation AvoidSoftInputViewManager

RCT_EXPORT_MODULE(AvoidSoftInputView)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

RCT_CUSTOM_VIEW_PROPERTY(avoidOffset, double, AvoidSoftInputView)
{
    [view.manager setAvoidOffset:[RCTConvert CGFloat:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(easing, UIViewAnimationOptions, AvoidSoftInputView)
{
    [view.manager setEasing:[RCTConvert UIViewAnimationOptions:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(enabled, BOOL, AvoidSoftInputView)
{
    [view.manager setIsEnabled:[RCTConvert BOOL:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(hideAnimationDelay, NSNumber, AvoidSoftInputView)
{
    [view.manager setHideAnimationDelay:[RCTConvert NSNumber:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(hideAnimationDuration, NSNumber, AvoidSoftInputView)
{
    [view.manager setHideAnimationDuration:[RCTConvert NSNumber:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(showAnimationDelay, NSNumber, AvoidSoftInputView)
{
    [view.manager setShowAnimationDelay:[RCTConvert NSNumber:json]];
}
RCT_CUSTOM_VIEW_PROPERTY(showAnimationDuration, NSNumber, AvoidSoftInputView)
{
    [view.manager setShowAnimationDuration:[RCTConvert NSNumber:json]];
}

RCT_EXPORT_VIEW_PROPERTY(onSoftInputAppliedOffsetChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHeightChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHidden, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputShown, RCTDirectEventBlock)

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

@end
