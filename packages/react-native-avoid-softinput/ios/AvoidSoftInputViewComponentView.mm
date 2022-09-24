#ifdef RCT_NEW_ARCH_ENABLED

#import "AvoidSoftInputViewComponentView.h"

#import <react/renderer/components/rnavoidsoftinput/ComponentDescriptors.h>
#import <react/renderer/components/rnavoidsoftinput/EventEmitters.h>
#import <react/renderer/components/rnavoidsoftinput/Props.h>
#import <react/renderer/components/rnavoidsoftinput/RCTComponentViewHelpers.h>

#import <React/RCTFabricComponentsPlugins.h>

#import <objc/runtime.h>

#import <React/RCTAssert.h>
#import <React/RCTView.h>

// MARK: Swift classes in ObjC++

// Does not work https://github.com/CocoaPods/CocoaPods/issues/10544
//#import "react_native_avoid_softinput-Swift.h"
__attribute__((objc_runtime_name("_TtC28react_native_avoid_softinput18AvoidSoftInputView")))
@interface AvoidSoftInputView : RCTView
@property (nonatomic, copy) void (^_Nullable onAppliedOffsetChangedEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onHeightChangedEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onHiddenEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) void (^_Nullable onShownEvent)(AvoidSoftInputView *, CGFloat);
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputHidden;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputShown;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputAppliedOffsetChange;
@property (nonatomic, copy) RCTDirectEventBlock _Nullable onSoftInputHeightChange;
- (void)setAvoidOffset:(NSNumber *_Nullable)offset;
- (void)setEasing:(NSString *_Nullable)easing;
- (void)setEnabled:(BOOL)enabled;
- (void)setHideAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setHideAnimationDuration:(NSNumber *_Nullable)duration;
- (void)setShowAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setShowAnimationDuration:(NSNumber *_Nullable)duration;
- (nonnull instancetype)initWithFrame:(CGRect)frame;
- (void)willMoveToSuperview:(UIView *_Nullable)newSuperview;
@end

using namespace facebook::react;

@interface AvoidSoftInputViewComponentView () <RCTAvoidSoftInputViewViewProtocol>

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
    __weak __typeof__(self) weakSelf = self;
    view.onAppliedOffsetChangedEvent = ^void(AvoidSoftInputView *sender, CGFloat offset) {
      __typeof__(self) strongSelf = weakSelf;
      [strongSelf onAppliedOffsetChangedEvent:offset];
    };
    view.onHeightChangedEvent = ^void(AvoidSoftInputView *sender, CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      [strongSelf onHeightChangedEvent:height];
    };
    view.onHiddenEvent = ^void(AvoidSoftInputView *sender, CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      [strongSelf onHiddenEvent:height];
    };
    view.onShownEvent = ^void(AvoidSoftInputView *sender, CGFloat height) {
      __typeof__(self) strongSelf = weakSelf;
      [strongSelf onShownEvent:height];
    };
    self.contentView = view;
  }
  return self;
}

// MARK: Private methods

- (void)onAppliedOffsetChangedEvent:(CGFloat)offset
{
  if (_eventEmitter != nil) {
    std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
        ->onSoftInputAppliedOffsetChange(
            AvoidSoftInputViewEventEmitter::OnSoftInputAppliedOffsetChange{.appliedOffset = static_cast<int>(offset)});
  }
}

- (void)onHeightChangedEvent:(CGFloat)height
{
  if (_eventEmitter != nil) {
    std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
        ->onSoftInputHeightChange(
            AvoidSoftInputViewEventEmitter::OnSoftInputHeightChange{.softInputHeight = static_cast<int>(height)});
  }
}

- (void)onHiddenEvent:(CGFloat)height
{
  if (_eventEmitter != nil) {
    std::dynamic_pointer_cast<const AvoidSoftInputViewEventEmitter>(_eventEmitter)
        ->onSoftInputHidden(
            AvoidSoftInputViewEventEmitter::OnSoftInputHidden{.softInputHeight = static_cast<int>(height)});
  }
}

- (void)onShownEvent:(CGFloat)height
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
  if (newViewProps.avoidOffset != oldViewProps.avoidOffset) {
    [view setAvoidOffset:[NSNumber numberWithDouble:newViewProps.avoidOffset]];
  }

  if (newViewProps.easing != oldViewProps.easing) {
    auto easingStringValue = toString(newViewProps.easing);
    [view setEasing:[NSString stringWithCString:easingStringValue.c_str() encoding:[NSString defaultCStringEncoding]]];
  }

  if (newViewProps.enabled != oldViewProps.enabled) {
    [view setEnabled:newViewProps.enabled];
  }

  if (newViewProps.hideAnimationDelay != oldViewProps.hideAnimationDelay) {
    [view setHideAnimationDelay:[NSNumber numberWithInt:newViewProps.hideAnimationDelay]];
  }

  if (newViewProps.hideAnimationDuration != oldViewProps.hideAnimationDuration) {
    [view setHideAnimationDuration:[NSNumber numberWithInt:newViewProps.hideAnimationDuration]];
  }

  if (newViewProps.showAnimationDelay != oldViewProps.showAnimationDelay) {
    [view setShowAnimationDelay:[NSNumber numberWithInt:newViewProps.showAnimationDelay]];
  }

  if (newViewProps.showAnimationDuration != oldViewProps.showAnimationDuration) {
    [view setShowAnimationDuration:[NSNumber numberWithInt:newViewProps.showAnimationDuration]];
  }

  [super updateProps:props oldProps:oldProps];
}

// MARK: RCTComponentViewProtocol

// adding/removing subviews must be forwarded to self.contentView, thus those 2 methods must be overriden;

- (void)mountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  RCTAssert(
      childComponentView.superview == nil,
      @"Attempt to mount already mounted component view. (parent: %@, child: %@, index: %@, existing parent: %@)",
      self,
      childComponentView,
      @(index),
      @([childComponentView.superview tag]));

  if (self.removeClippedSubviews) {
    // Do sth similar as in <React/UIView+React.h>
    NSMutableArray *subviews = objc_getAssociatedObject(self.contentView, @selector(reactSubviews));
    if (!subviews) {
      subviews = [NSMutableArray new];
      objc_setAssociatedObject(self.contentView, @selector(reactSubviews), subviews, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
    }
    [subviews insertObject:childComponentView atIndex:index];
  } else {
    [self.contentView insertSubview:childComponentView atIndex:index];
  }
}

- (void)unmountChildComponentView:(UIView<RCTComponentViewProtocol> *)childComponentView index:(NSInteger)index
{
  if (self.removeClippedSubviews) {
    // Do sth similar as in <React/UIView+React.h>
    NSMutableArray *subviews = objc_getAssociatedObject(self.contentView, @selector(reactSubviews));
    if (subviews != nil) {
      [subviews removeObjectAtIndex:index];
    }
  } else {
    RCTAssert(
        childComponentView.superview == self.contentView,
        @"Attempt to unmount a view which is mounted inside different view. (parent: %@, child: %@, index: %@)",
        self,
        childComponentView,
        @(index));
    RCTAssert(
        (self.contentView.subviews.count > index) &&
            [self.contentView.subviews objectAtIndex:index] == childComponentView,
        @"Attempt to unmount a view which has a different index. (parent: %@, child: %@, index: %@, actual index: %@, tag at index: %@)",
        self,
        childComponentView,
        @(index),
        @([self.contentView.subviews indexOfObject:childComponentView]),
        @([[self.contentView.subviews objectAtIndex:index] tag]));
  }

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
