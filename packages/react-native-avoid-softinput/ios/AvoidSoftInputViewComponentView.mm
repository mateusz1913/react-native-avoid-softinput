#ifdef RCT_NEW_ARCH_ENABLED

#import "AvoidSoftInputViewComponentView.h"

#import <react/renderer/components/rnavoidsoftinput/ComponentDescriptors.h>
#import <react/renderer/components/rnavoidsoftinput/EventEmitters.h>
#import <react/renderer/components/rnavoidsoftinput/Props.h>
#import <react/renderer/components/rnavoidsoftinput/RCTComponentViewHelpers.h>

#import <React/RCTAssert.h>
#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>

#import "AvoidSoftInputView.h"

#import "RCTConvert+UIViewAnimationOptions.h"

// MARK: Swift classes in ObjC++
#if __has_include("ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h")
#import "ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h"
#else
#import "ReactNativeAvoidSoftinput-Swift.h"
#endif

using namespace facebook::react;

@interface AvoidSoftInputViewComponentView () <RCTAvoidSoftInputViewViewProtocol>

@end

@interface AvoidSoftInputViewComponentView () <AvoidSoftInputViewDelegate>

@end

// MARK: Implementation

@implementation AvoidSoftInputViewComponentView

// MARK: Init

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        static const auto defaultProps = std::make_shared<const AvoidSoftInputViewProps>();
        _props = defaultProps;
        AvoidSoftInputView *view = [AvoidSoftInputView new];
        view.delegate = self;
        self.contentView = view;
    }
    return self;
}

// MARK: AvoidSoftInputViewDelegate

- (void)onAppliedOffsetChangedEvent:(AvoidSoftInputView *)sender offset:(CGFloat)offset
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputAppliedOffsetChange(AvoidSoftInputViewEventEmitter::OnSoftInputAppliedOffsetChange{
                .appliedOffset = static_cast<int>(offset)});
    }
}

- (void)onHeightChangedEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputHeightChange(
                AvoidSoftInputViewEventEmitter::OnSoftInputHeightChange{.softInputHeight = static_cast<int>(height)});
    }
}

- (void)onHiddenEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputHidden(
                AvoidSoftInputViewEventEmitter::OnSoftInputHidden{.softInputHeight = static_cast<int>(height)});
    }
}

- (void)onShownEvent:(AvoidSoftInputView *)sender height:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputShown(
                AvoidSoftInputViewEventEmitter::OnSoftInputShown{.softInputHeight = static_cast<int>(height)});
    }
}

// MARK: Props
- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<const AvoidSoftInputViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const AvoidSoftInputViewProps>(props);

    AvoidSoftInputView *view = (AvoidSoftInputView *)self.contentView;
    if (oldViewProps.avoidOffset != newViewProps.avoidOffset) {
        [view.manager setAvoidOffset:newViewProps.avoidOffset];
    }

    if (oldViewProps.easing != newViewProps.easing) {
        NSString *easingString = RCTNSStringFromStringNilIfEmpty(toString(newViewProps.easing));
        UIViewAnimationOptions easing = [RCTConvert UIViewAnimationOptions:easingString];
        [view.manager setEasing:easing];
    }

    if (oldViewProps.enabled != newViewProps.enabled) {
        [view.manager setIsEnabled:newViewProps.enabled];
    }

    if (oldViewProps.hideAnimationDelay != newViewProps.hideAnimationDelay) {
        [view.manager setHideAnimationDelay:[NSNumber numberWithInt:newViewProps.hideAnimationDelay]];
    }

    if (oldViewProps.hideAnimationDuration != newViewProps.hideAnimationDuration) {
        [view.manager setHideAnimationDuration:[NSNumber numberWithInt:newViewProps.hideAnimationDuration]];
    }

    if (oldViewProps.showAnimationDelay != newViewProps.showAnimationDelay) {
        [view.manager setShowAnimationDelay:[NSNumber numberWithInt:newViewProps.showAnimationDelay]];
    }

    if (oldViewProps.showAnimationDuration != newViewProps.showAnimationDuration) {
        [view.manager setShowAnimationDuration:[NSNumber numberWithInt:newViewProps.showAnimationDuration]];
    }

    [super updateProps:props oldProps:oldProps];
}

// MARK: RCTComponentViewProtocol

// adding/removing subviews must be forwarded to self.contentView, thus those 2 methods must be overriden;

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [self.contentView insertSubview:childComponentView atIndex:index];
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
    [childComponentView removeFromSuperview];
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<AvoidSoftInputViewComponentDescriptor>();
}

@end

Class<RCTComponentViewProtocol> AvoidSoftInputViewCls(void)
{
    return AvoidSoftInputViewComponentView.class;
}

#endif
