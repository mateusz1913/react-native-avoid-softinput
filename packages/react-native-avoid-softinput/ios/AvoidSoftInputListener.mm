#import <React/RCTUtils.h>

#import "AvoidSoftInputListener.h"
#import "AvoidSoftInputUtils.h"

@implementation AvoidSoftInputListener {
    CGFloat previousSoftInputHeight;
    CGFloat previousScreenHeight;
    BOOL isInitialized;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        previousScreenHeight = 0;
        previousSoftInputHeight = 0;
    }
    return self;
}

// MARK: Public methods
- (void)initializeHandlers
{
    if (isInitialized) {
        return;
    }

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(softInputWillShow:)
                                                 name:UIKeyboardWillShowNotification
                                               object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(softInputWillHide:)
                                                 name:UIKeyboardWillHideNotification
                                               object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(softInputHeightWillChange:)
                                                 name:UIKeyboardWillChangeFrameNotification
                                               object:nil];
    isInitialized = YES;
}

- (void)cleanupHandlers
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    isInitialized = NO;
}

// MARK: Private methods
- (void)softInputWillHide:(NSNotification *)notification
{
    [self.delegate onHide:0];
}

- (void)softInputWillShow:(NSNotification *)notification
{
    NSDictionary *userInfo = notification.userInfo;
    if (userInfo == nil) {
        return;
    }

    NSValue *softInputUserInfo = userInfo[UIKeyboardFrameEndUserInfoKey];
    if (softInputUserInfo == nil) {
        return;
    }

    CGFloat softInputDetectedHeight = softInputUserInfo.CGRectValue.size.height;
    [self.delegate onShow:softInputDetectedHeight];
}

- (void)softInputHeightWillChange:(NSNotification *)notification
{
    NSDictionary *userInfo = notification.userInfo;
    if (userInfo == nil) {
        return;
    }

    NSValue *softInputUserInfo = userInfo[UIKeyboardFrameEndUserInfoKey];
    if (softInputUserInfo == nil) {
        return;
    }

    UIViewController *presentedViewController = RCTPresentedViewController();
    if (presentedViewController == nil) {
        return;
    }

    UIView *rootView = [presentedViewController getReactRootView];
    CGFloat screenHeight = [rootView getScreenHeight];
    // notification frame width info is not reliable, so instead compare new and previous screen height values
    BOOL isOrientationChange = screenHeight != previousScreenHeight;

    CGFloat newSoftInputHeight = screenHeight - softInputUserInfo.CGRectValue.origin.y;

    /// https://github.com/mateusz1913/react-native-avoid-softinput/issues/226
    /// The frame can be zero, when UIAccessibility.prefersCrossFadeTransitions setting is enabled
    /// In that case, let's default to "closed" keyboard value
    if (softInputUserInfo.CGRectValue.origin.y == 0) {
        newSoftInputHeight = 0;
    }

    // notification begin frame info is not reliable, so instead get previous cached value
    CGFloat oldSoftInputHeight = previousSoftInputHeight;

    if (newSoftInputHeight < 0 || oldSoftInputHeight < 0) {
        return;
    }
    previousSoftInputHeight = newSoftInputHeight;
    previousScreenHeight = screenHeight;

    [self.delegate onHeightChangedWithOldSoftInputHeight:oldSoftInputHeight
                                      newSoftInputHeight:newSoftInputHeight
                                     isOrientationChange:isOrientationChange];
}

@end
