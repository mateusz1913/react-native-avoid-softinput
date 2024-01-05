#import "AvoidSoftInputAnimator.h"

@implementation AvoidSoftInputAnimator {
    CGFloat addedOffset;
    CADisplayLink *animationTimer;
    CGFloat currentAppliedOffset;
    CGFloat currentFakeAnimationViewAlpha;
    UIView *fakeAnimationView;
    CGFloat initialOffset;
    BOOL isAnimationCancelled;
    BOOL isAnimationRunning;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        addedOffset = 0;
        currentAppliedOffset = 0;
        currentFakeAnimationViewAlpha = 0;
        fakeAnimationView = [UIView new];
        initialOffset = 0;
        isAnimationCancelled = NO;
        isAnimationRunning = NO;
    }
    return self;
}

// MARK: Public getters
- (BOOL)isAnimationRunning
{
    return isAnimationRunning;
}

// MARK: Public methods
- (void)beginAnimationWithInitialOffset:(CGFloat)initialOffsetArg addedOffset:(CGFloat)addedOffsetArg
{
    isAnimationRunning = YES;
    fakeAnimationView.alpha = 0.0;
    isAnimationCancelled = NO;
    initialOffset = initialOffsetArg;
    addedOffset = addedOffsetArg;
    if (initialOffset + addedOffset == 0 && addedOffset != 0) {
        [self sendOffsetChangedEvent:initialOffset];
    }
}

- (void)setupAnimationTimersWithRootView:(UIView *)rootView
{
    animationTimer = [CADisplayLink displayLinkWithTarget:self selector:@selector(updateAnimation)];
    [animationTimer addToRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];
    [rootView addSubview:fakeAnimationView];
    fakeAnimationView.alpha = 1.0;
}

- (void)completeAnimationWithNewBottomOffset:(CGFloat)newBottomOffset
              shouldSaveCurrentAppliedOffset:(BOOL)shouldSaveCurrentAppliedOffset
{
    isAnimationRunning = NO;
    if (isAnimationCancelled) {
        return;
    }
    [animationTimer setPaused:YES];
    [animationTimer invalidate];
    currentFakeAnimationViewAlpha = 0.0;
    fakeAnimationView.alpha = 0.0;
    [fakeAnimationView removeFromSuperview];

    [self sendOffsetChangedEvent:newBottomOffset];
    initialOffset = newBottomOffset;
    addedOffset = 0;

    if (shouldSaveCurrentAppliedOffset) {
        currentAppliedOffset = newBottomOffset;
    }
}

- (void)cleanup
{
    isAnimationCancelled = YES;
    [animationTimer setPaused:YES];
    [animationTimer invalidate];
    currentFakeAnimationViewAlpha = 1.0;
}

// MARK: Private methods
- (void)sendOffsetChangedEvent:(CGFloat)offset
{
    [self.delegate onOffsetChanged:offset];
}

- (void)updateAnimation
{
    CALayer *presentationLayer = [fakeAnimationView layer].presentationLayer;
    if (presentationLayer == nil) {
        return;
    }

    float currentFakeAlpha = presentationLayer.opacity;
    if (currentFakeAnimationViewAlpha == (CGFloat)currentFakeAlpha) {
        return;
    }

    currentFakeAnimationViewAlpha = (CGFloat)currentFakeAlpha;

    CGFloat newCurrentOffset = initialOffset + currentFakeAnimationViewAlpha * addedOffset;
    if (newCurrentOffset == currentAppliedOffset) {
        return;
    }

    currentAppliedOffset = newCurrentOffset;
    [self sendOffsetChangedEvent:newCurrentOffset];
}

@end
