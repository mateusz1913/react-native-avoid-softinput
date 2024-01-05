#import "AvoidSoftInputManager.h"
#import "AvoidSoftInputAnimationHandler.h"
#import "AvoidSoftInputConstants.h"
#import "AvoidSoftInputListener.h"

@implementation AvoidSoftInputManager {
    AvoidSoftInputAnimationHandler *animationHandler;
    AvoidSoftInputListener *listener;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        animationHandler = [AvoidSoftInputAnimationHandler new];
        animationHandler.delegate = self;
        listener = [AvoidSoftInputListener new];
        listener.delegate = self;
    }
    return self;
}

// MARK: Public setters
- (void)setCustomView:(UIView *)customView
{
    _customView = customView;
    animationHandler.customView = customView;
}

// MARK: Public methods
- (void)setAvoidOffset:(CGFloat)offset
{
    animationHandler.avoidOffset = offset;
}

- (void)setEasing:(UIViewAnimationOptions)easing
{
    animationHandler.easingOption = easing;
}

- (void)setIsEnabled:(BOOL)enabled
{
    [animationHandler setEnabled:enabled];
}

- (void)setHideAnimationDelay:(NSNumber *)delay
{
    if (delay != nil) {
        animationHandler.hideDelay = [delay doubleValue] / 1000;
    } else {
        animationHandler.hideDelay = [AvoidSoftInputConstants hideAnimationDelayInSeconds];
    }
}

- (void)setHideAnimationDuration:(NSNumber *)duration
{
    if (duration != nil) {
        animationHandler.hideDuration = [duration doubleValue] / 1000;
    } else {
        animationHandler.hideDuration = [AvoidSoftInputConstants hideAnimationDurationInSeconds];
    }
}

- (void)setShowAnimationDelay:(NSNumber *)delay
{
    if (delay != nil) {
        animationHandler.showDelay = [delay doubleValue] / 1000;
    } else {
        animationHandler.showDelay = [AvoidSoftInputConstants showAnimationDelayInSeconds];
    }
}

- (void)setShowAnimationDuration:(NSNumber *)duration
{
    if (duration != nil) {
        animationHandler.showDuration = [duration doubleValue] / 1000;
    } else {
        animationHandler.showDuration = [AvoidSoftInputConstants showAnimationDurationInSeconds];
    }
}

- (void)initializeHandlers
{
    [listener initializeHandlers];
}

- (void)cleanupHandlers
{
    [listener cleanupHandlers];
}

// MARK: Animation handler delegate implementation
- (void)onOffsetChanged:(CGFloat)offset
{
    [self.delegate onOffsetChanged:offset];
}

// MARK: Listener delegate implementation
- (void)onHide:(CGFloat)height
{
    [self.delegate onHide:height];
}

- (void)onShow:(CGFloat)height
{
    [self.delegate onShow:height];
}

- (void)onHeightChangedWithOldSoftInputHeight:(CGFloat)oldSoftInputHeight
                           newSoftInputHeight:(CGFloat)newSoftInputHeight
                          isOrientationChange:(BOOL)isOrientationChange
{
    [self.delegate onHeightChanged:newSoftInputHeight];
    [animationHandler startAnimationFrom:oldSoftInputHeight
                                      to:newSoftInputHeight
                   withOrientationChange:isOrientationChange];
}

@end
