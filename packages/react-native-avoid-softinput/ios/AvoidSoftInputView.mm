#if RCT_NEW_ARCH_ENABLED
#else
#import "AvoidSoftInputView.h"
#import <React/UIView+React.h>
#import "AvoidSoftInputManager.h"
#import "RCTConvert+UIViewAnimationOptions.h"

// MARK: Manager delegate

@interface AvoidSoftInputView () <AvoidSoftInputManagerDelegate>

@end

// MARK: Implementation

@implementation AvoidSoftInputView {
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

- (void)willMoveToSuperview:(UIView *)newSuperview
{
    [super willMoveToSuperview:newSuperview];
    if (self.superview == nil && newSuperview != nil) {
        [self setupManager];
    } else if (self.superview != nil && newSuperview == nil) {
        [self cleanupManager];
    }
}

// MARK: Props
- (void)setAvoidOffset:(double)avoidOffset
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setAvoidOffset:avoidOffset];
    });
}

- (void)setEasing:(NSString *_Nullable)easing
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setEasing:[RCTConvert UIViewAnimationOptions:easing]];
    });
}

- (void)setEnabled:(BOOL)enabled
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setIsEnabled:enabled];
    });
}

- (void)setHideAnimationDelay:(NSNumber *_Nullable)hideAnimationDelay
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setHideAnimationDelay:hideAnimationDelay];
    });
}

- (void)setHideAnimationDuration:(NSNumber *_Nullable)hideAnimationDuration
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setHideAnimationDuration:hideAnimationDuration];
    });
}

- (void)setShowAnimationDelay:(NSNumber *_Nullable)showAnimationDelay
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setShowAnimationDelay:showAnimationDelay];
    });
}

- (void)setShowAnimationDuration:(NSNumber *_Nullable)showAnimationDuration
{
    dispatch_async(dispatch_get_main_queue(), ^{
      [self.manager setShowAnimationDuration:showAnimationDuration];
    });
}

// MARK: Manager delegate implementation

- (void)onOffsetChanged:(CGFloat)offset
{
    [self.delegate onAppliedOffsetChangedEvent:self offset:offset];
}

- (void)onHeightChanged:(CGFloat)height
{
    [self.delegate onHeightChangedEvent:self height:height];
}

- (void)onHide:(CGFloat)height
{
    [self.delegate onHiddenEvent:self height:height];
}

- (void)onShow:(CGFloat)height
{
    [self.delegate onShownEvent:self height:height];
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

@end
#endif
