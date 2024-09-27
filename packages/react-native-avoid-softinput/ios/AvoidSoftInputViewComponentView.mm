#if RCT_NEW_ARCH_ENABLED

#import "AvoidSoftInputViewComponentView.h"

#import <react/renderer/components/rnavoidsoftinput/ComponentDescriptors.h>
#import <react/renderer/components/rnavoidsoftinput/EventEmitters.h>
#import <react/renderer/components/rnavoidsoftinput/Props.h>
#import <react/renderer/components/rnavoidsoftinput/RCTComponentViewHelpers.h>

#import <React/RCTAssert.h>
#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>

#import "AvoidSoftInputManager.h"

#import "RCTConvert+UIViewAnimationOptions.h"

using namespace facebook::react;

@interface AvoidSoftInputViewComponentView () <RCTAvoidSoftInputViewViewProtocol>

@end

// MARK: Manager delegate

@interface AvoidSoftInputViewComponentView () <AvoidSoftInputManagerDelegate>

@end

// MARK: Implementation

@implementation AvoidSoftInputViewComponentView {
    AvoidSoftInputManager *managerInstance;
}

- (AvoidSoftInputManager *)manager
{
    @synchronized(self) {
        if (managerInstance == nil) {
            managerInstance = [AvoidSoftInputManager new];
        }

        return managerInstance;
    }
}

// MARK: Init

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if (self) {
        static const auto defaultProps = std::make_shared<const AvoidSoftInputViewProps>();
        _props = defaultProps;
    }
    return self;
}

// Needed because of this: https://github.com/facebook/react-native/pull/37274
+ (void)load
{
    [super load];
}

- (void)willMoveToSuperview:(UIView *)newSuperview
{
    [super willMoveToSuperview:newSuperview];
    if (self.superview == nil && newSuperview != nil) {
        [self setupManager];
    } else if (self.superview != nil && newSuperview == nil) {
        [self cleanupManager];
    }
}

- (void)prepareForRecycle
{
    [self cleanupManager];
}

// MARK: Manager delegate implementation

- (void)onOffsetChanged:(CGFloat)offset
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputAppliedOffsetChange(AvoidSoftInputViewEventEmitter::OnSoftInputAppliedOffsetChange{
                .appliedOffset = static_cast<int>(offset)});
    }
}

- (void)onHeightChanged:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputHeightChange(
                AvoidSoftInputViewEventEmitter::OnSoftInputHeightChange{.softInputHeight = static_cast<int>(height)});
    }
}

- (void)onHide:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputHidden(
                AvoidSoftInputViewEventEmitter::OnSoftInputHidden{.softInputHeight = static_cast<int>(height)});
    }
}

- (void)onShow:(CGFloat)height
{
    if (_eventEmitter != nil) {
        std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
            ->onSoftInputShown(
                AvoidSoftInputViewEventEmitter::OnSoftInputShown{.softInputHeight = static_cast<int>(height)});
    }
}

// MARK: Private methods

- (void)setupManager
{
    RCTAssertMainQueue();
    self.manager.delegate = self;
    self.manager.customView = self;
    [self.manager setIsEnabled:true];
    [self.manager initializeHandlers];
}

- (void)cleanupManager
{
    [self.manager cleanupHandlers];
    self.manager.customView = nil;
    self.manager.delegate = nil;
    managerInstance = nil;
}

// MARK: Props
- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<const AvoidSoftInputViewProps>(_props);
    const auto &newViewProps = *std::static_pointer_cast<const AvoidSoftInputViewProps>(props);

    if (oldViewProps.avoidOffset != newViewProps.avoidOffset) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setAvoidOffset:newViewProps.avoidOffset];
        });
    }

    if (oldViewProps.easing != newViewProps.easing) {
        NSString *easingString = RCTNSStringFromStringNilIfEmpty(toString(newViewProps.easing));
        UIViewAnimationOptions easing = [RCTConvert UIViewAnimationOptions:easingString];
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setEasing:easing];
        });
    }

    if (oldViewProps.enabled != newViewProps.enabled) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setIsEnabled:newViewProps.enabled];
        });
    }

    if (oldViewProps.hideAnimationDelay != newViewProps.hideAnimationDelay) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setHideAnimationDelay:[NSNumber numberWithInt:newViewProps.hideAnimationDelay]];
        });
    }

    if (oldViewProps.hideAnimationDuration != newViewProps.hideAnimationDuration) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setHideAnimationDuration:[NSNumber numberWithInt:newViewProps.hideAnimationDuration]];
        });
    }

    if (oldViewProps.showAnimationDelay != newViewProps.showAnimationDelay) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setShowAnimationDelay:[NSNumber numberWithInt:newViewProps.showAnimationDelay]];
        });
    }

    if (oldViewProps.showAnimationDuration != newViewProps.showAnimationDuration) {
        dispatch_async(dispatch_get_main_queue(), ^{
          [self.manager setShowAnimationDuration:[NSNumber numberWithInt:newViewProps.showAnimationDuration]];
        });
    }

    [super updateProps:props oldProps:oldProps];
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
