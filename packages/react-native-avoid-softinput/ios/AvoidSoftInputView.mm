#import "AvoidSoftInputView.h"

#import <React/UIView+React.h>

// MARK: Swift classes in ObjC++
#if __has_include("ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h")
#import "ReactNativeAvoidSoftinput/ReactNativeAvoidSoftinput-Swift.h"
#else
#import "ReactNativeAvoidSoftinput-Swift.h"
#endif

// MARK: Manager delegate

@interface AvoidSoftInputView () <AvoidSoftInputManagerDelegate>

@end

// MARK: Implementation

@implementation AvoidSoftInputView {
    AvoidSoftInputManager *managerInstance;
}

- (AvoidSoftInputManager *)manager
{
    if (managerInstance == nil) {
        managerInstance = [AvoidSoftInputManager new];
    }

    return managerInstance;
}

// MARK: Init

- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];

    if (self) {
        self.manager.delegate = self;
        self.manager.customView = self;
        [self.manager setIsEnabled:true];
        [self.manager initializeHandlers];
    }

    return self;
}

- (void)dealloc
{
    [self.manager cleanupHandlers];
}

- (void)willMoveToSuperview:(UIView *)newSuperview
{
    [super willMoveToSuperview:newSuperview];
    if (self.superview == nil && newSuperview != nil) {
        [self.manager initializeHandlers];
    } else if (self.superview != nil && newSuperview == nil) {
        [self.manager cleanupHandlers];
    }
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

@end
