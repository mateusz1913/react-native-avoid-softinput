#import <React/RCTUtils.h>

#import "AvoidSoftInputAnimationHandler.h"
#import "AvoidSoftInputAnimator.h"
#import "AvoidSoftInputConstants.h"
#import "AvoidSoftInputUtils.h"
#import "AvoidSoftInputView.h"

@implementation AvoidSoftInputAnimationHandler {
    AvoidSoftInputAnimator *hideAnimator;
    AvoidSoftInputAnimator *showAnimator;
    CGFloat bottomOffset;
    UIView *lastFocusedView;
    UIEdgeInsets scrollContentInset;
    UIEdgeInsets scrollIndicatorInsets;
    BOOL softInputVisible;
    BOOL wasAddOffsetInRootViewAborted;
    BOOL wasAddOffsetInScrollViewAborted;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _avoidOffset = 0;
        _easingOption = UIViewAnimationCurveLinear;
        _hideDelay = [AvoidSoftInputConstants hideAnimationDelayInSeconds];
        _hideDuration = [AvoidSoftInputConstants hideAnimationDurationInSeconds];
        _enabled = NO;
        _showDelay = [AvoidSoftInputConstants showAnimationDelayInSeconds];
        _showDuration = [AvoidSoftInputConstants showAnimationDurationInSeconds];

        hideAnimator = [AvoidSoftInputAnimator new];
        hideAnimator.delegate = self;
        showAnimator = [AvoidSoftInputAnimator new];
        showAnimator.delegate = self;

        bottomOffset = 0;
        scrollContentInset = UIEdgeInsetsZero;
        scrollIndicatorInsets = UIEdgeInsetsZero;
        softInputVisible = NO;
        wasAddOffsetInRootViewAborted = NO;
        wasAddOffsetInScrollViewAborted = NO;
    }
    return self;
}

// MARK: Animator delegate implementation
- (void)onOffsetChanged:(CGFloat)offset
{
    [self.delegate onOffsetChanged:offset];
}

// MARK: Public methods
- (void)startAnimationFrom:(CGFloat)from to:(CGFloat)to withOrientationChange:(BOOL)isOrientationChange
{
    UIView *rootView = self.customView;
    if (rootView == nil) {
        UIViewController *presentedViewController = RCTPresentedViewController();
        if (presentedViewController == nil) {
            return;
        }

        rootView = [presentedViewController getReactRootView];
    }

    UIView *firstResponder = [rootView findFirstResponder];
    if (firstResponder == nil) {
        if (lastFocusedView == nil) {
            return;
        }
        firstResponder = lastFocusedView;
    }

    lastFocusedView = firstResponder;

    ///
    /// If this root view is _not_ a AvoidSoftInputView, and the firstResponder is inside AvoidSoftInputView,
    /// the animation will take place in AvoidSoftInputView's animation handler instance
    ///
    BOOL shouldSkipSettingOffset = !self.isCustomRootView && [firstResponder checkIfNestedInAvoidSoftInputView];
    if (shouldSkipSettingOffset) {
        return;
    }

    [self setOffsetFrom:from
                         to:to
        isOrientationChange:isOrientationChange
             firstResponder:firstResponder
                   rootView:rootView];
}

// MARK: Private methods
- (BOOL)isCustomRootView
{
    return [self.customView isKindOfClass:[AvoidSoftInputView class]];
}

- (void)runAnimatorWithDuration:(double)duration
                          delay:(double)delay
                         easing:(UIViewAnimationOptions)easing
                        onStart:(void (^)())onStart
                      onAnimate:(void (^)())onAnimate
                     onComplete:(void (^)())onComplete
{
    onStart();
    [UIView animateWithDuration:duration
        delay:delay
        options:(UIViewAnimationOptionBeginFromCurrentState | easing)
        animations:^{
          onAnimate();
        }
        completion:^(BOOL finished) {
          onComplete();
        }];
}

- (void)setOffsetFrom:(CGFloat)from
                     to:(CGFloat)to
    isOrientationChange:(BOOL)isOrientationChange
         firstResponder:(UIView *)firstResponder
               rootView:(UIView *)rootView
{
    UIScrollView *scrollView = [firstResponder findScrollViewForFirstResponderInRootView:rootView];
    if (scrollView != nil) {
        [self setOffsetInScrollViewFrom:from
                                     to:to
                    isOrientationChange:isOrientationChange
                         firstResponder:firstResponder
                             scrollView:scrollView
                               rootView:rootView];
    } else {
        [self setOffsetInRootView:rootView
                             from:from
                               to:to
              isOrientationChange:isOrientationChange
                   firstResponder:firstResponder];
    }
}

- (void)setOffsetInRootView:(UIView *)rootView
                       from:(CGFloat)from
                         to:(CGFloat)to
        isOrientationChange:(BOOL)isOrientationChange
             firstResponder:(UIView *)firstResponder
{
    if (softInputVisible && isOrientationChange) {
        /// RESET
        [self addOffsetInRootView:rootView offset:to withFirstResponder:firstResponder];
        return;
    }
    if (to == from) {
        return;
    }
    if (to == 0) {
        /// HIDE
        /// Run remove offset method no matter if it is enabled (in case applied offset is 0, it will be no-op)
        [self removeOffsetInRootView:rootView];
        return;
    }
    if (!_enabled) {
        return;
    }
    if (to - from > 0 && (!softInputVisible || from == 0)) {
        // SHOW
        [self addOffsetInRootView:rootView offset:to withFirstResponder:firstResponder];
        return;
    }
    if (to - from > 0) {
        /// INCREASE
        [self changeOffsetInRootView:rootView
                 withPrimaryAnimator:showAnimator
                andSecondaryAnimator:hideAnimator
                                from:from
                                  to:to];
        return;
    }
    if (to - from < 0) {
        /// DECREASE
        [self changeOffsetInRootView:rootView
                 withPrimaryAnimator:hideAnimator
                andSecondaryAnimator:showAnimator
                                from:from
                                  to:to];
        return;
    }
}

- (void)changeOffsetInRootView:(UIView *)rootView
           withPrimaryAnimator:(AvoidSoftInputAnimator *)primaryAnimator
          andSecondaryAnimator:(AvoidSoftInputAnimator *)secondaryAnimator
                          from:(CGFloat)from
                            to:(CGFloat)to
{
    CGFloat addedOffset = to - from;
    BOOL shouldAddOffset = primaryAnimator.isAnimationRunning || wasAddOffsetInRootViewAborted;
    CGFloat newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset;
    if (newBottomOffset < 0) {
        return;
    }

    [self runAnimatorWithDuration:_hideDuration
        delay:_hideDelay
        easing:_easingOption
        onStart:^{
          [primaryAnimator beginAnimationWithInitialOffset:self->bottomOffset
                                               addedOffset:newBottomOffset - self->bottomOffset];
          self->softInputVisible = YES;
          [secondaryAnimator cleanup];
        }
        onAnimate:^{
          [primaryAnimator setupAnimationTimersWithRootView:rootView];
          [rootView setFrame:CGRectMake(
                                 rootView.frame.origin.x,
                                 -newBottomOffset,
                                 rootView.frame.size.width,
                                 rootView.frame.size.height)];
        }
        onComplete:^{
          [primaryAnimator completeAnimationWithNewBottomOffset:newBottomOffset shouldSaveCurrentAppliedOffset:NO];
          self->bottomOffset = newBottomOffset;
        }];
}

- (void)removeOffsetInRootView:(UIView *)rootView
{
    if (rootView.frame.origin.y == 0) {
        /// https://github.com/mateusz1913/react-native-avoid-softinput/issues/86
        /// If we are here, it means that the view which had offset applied was probably unmounted.
        /// This can happen e.g. when user interactively dismiss iOS modal screen in react-navigation
        /// (I reproduced it in Native Stack, but the issue reporters had it in JS Stack -
        /// - both use react-native-screens under the hood)
        return;
    }

    CGFloat initialRootViewFrameOriginY = rootView.frame.origin.y;

    [self runAnimatorWithDuration:_hideDuration
        delay:_hideDelay
        easing:_easingOption
        onStart:^{
          [self->hideAnimator beginAnimationWithInitialOffset:self->bottomOffset addedOffset:-self->bottomOffset];
          [self->showAnimator cleanup];
        }
        onAnimate:^{
          [self->hideAnimator setupAnimationTimersWithRootView:rootView];

          /// at the end, origin.y should be equal to 0
          [rootView setFrame:CGRectMake(
                                 rootView.frame.origin.x,
                                 rootView.frame.origin.y + self->bottomOffset,
                                 rootView.frame.size.width,
                                 rootView.frame.size.height)];
        }
        onComplete:^{
          if (initialRootViewFrameOriginY == rootView.frame.origin.y) {
              /// https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
              /// Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
              [self->hideAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                        shouldSaveCurrentAppliedOffset:NO];
          } else {
              self->bottomOffset = 0;
              [self->hideAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                        shouldSaveCurrentAppliedOffset:YES];
              self->softInputVisible = NO;
              self->lastFocusedView = nil;
          }
        }];
}

- (void)addOffsetInRootView:(UIView *)rootView offset:(CGFloat)offset withFirstResponder:(UIView *)firstResponder
{
    CGFloat firstResponderDistanceToBottom = [firstResponder getDistanceToBottomEdgeInRootView:rootView];
    CGFloat newOffset = MAX(offset - firstResponderDistanceToBottom, 0);

    if (newOffset <= 0) {
        wasAddOffsetInRootViewAborted = YES;
        return;
    }

    wasAddOffsetInRootViewAborted = NO;
    bottomOffset = newOffset + _avoidOffset;

    [self runAnimatorWithDuration:_showDuration
        delay:_showDelay
        easing:_easingOption
        onStart:^{
          [self->showAnimator beginAnimationWithInitialOffset:0 addedOffset:self->bottomOffset];
          self->softInputVisible = YES;
          [self->hideAnimator cleanup];
        }
        onAnimate:^{
          [self->showAnimator setupAnimationTimersWithRootView:rootView];

          [rootView setFrame:CGRectMake(
                                 rootView.frame.origin.x,
                                 -self->bottomOffset,
                                 rootView.frame.size.width,
                                 rootView.frame.size.height)];
        }
        onComplete:^{
          [self->showAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                    shouldSaveCurrentAppliedOffset:YES];
        }];
}

- (void)setOffsetInScrollViewFrom:(CGFloat)from
                               to:(CGFloat)to
              isOrientationChange:(BOOL)isOrientationChange
                   firstResponder:(UIView *)firstResponder
                       scrollView:(UIScrollView *)scrollView
                         rootView:(UIView *)rootView
{
    if (softInputVisible && isOrientationChange) {
        /// RESET
        [self addOffsetInScrollView:scrollView offset:to withRootView:rootView andFirstResponder:firstResponder];
        return;
    }
    if (to == from) {
        return;
    }
    if (to == 0) {
        /// HIDE
        /// Run remove offset method no matter if it is enabled (in case applied offset is 0, it will be no-op)
        [self removeOffsetInScrollView:scrollView withRootView:rootView];
        return;
    }
    if (!_enabled) {
        return;
    }
    if (to - from > 0 && (!softInputVisible || from == 0)) {
        /// SHOW
        [self addOffsetInScrollView:scrollView offset:to withRootView:rootView andFirstResponder:firstResponder];
        return;
    }
    if (to - from > 0) {
        /// INCREASE
        [self changeOffsetInScrollView:scrollView
                   withPrimaryAnimator:showAnimator
                  andSecondaryAnimator:hideAnimator
                           andRootView:rootView
                     andFirstResponder:firstResponder
                                  from:from
                                    to:to];
        return;
    }
    if (to - from < 0) {
        /// DECREASE
        [self changeOffsetInScrollView:scrollView
                   withPrimaryAnimator:hideAnimator
                  andSecondaryAnimator:showAnimator
                           andRootView:rootView
                     andFirstResponder:firstResponder
                                  from:from
                                    to:to];
        return;
    }
}

- (void)changeOffsetInScrollView:(UIScrollView *)scrollView
             withPrimaryAnimator:(AvoidSoftInputAnimator *)primaryAnimator
            andSecondaryAnimator:(AvoidSoftInputAnimator *)secondaryAnimator
                     andRootView:(UIView *)rootView
               andFirstResponder:(UIView *)firstResponder
                            from:(CGFloat)from
                              to:(CGFloat)to
{
    CGFloat addedOffset = to - from;
    BOOL shouldAddOffset = primaryAnimator.isAnimationRunning || wasAddOffsetInScrollViewAborted;
    CGFloat newBottomOffset = shouldAddOffset ? bottomOffset : bottomOffset + addedOffset;
    CGFloat scrollToOffset = [self getScrollOffsetWithSoftInputHeight:to
                                                       firstResponder:firstResponder
                                                           scrollView:scrollView
                                                             rootView:rootView];

    if (newBottomOffset < 0) {
        return;
    }

    [self runAnimatorWithDuration:_hideDuration
        delay:_hideDelay
        easing:_easingOption
        onStart:^{
          [primaryAnimator beginAnimationWithInitialOffset:self->bottomOffset
                                               addedOffset:newBottomOffset - self->bottomOffset];
          self->softInputVisible = YES;
          [secondaryAnimator cleanup];
        }
        onAnimate:^{
          [primaryAnimator setupAnimationTimersWithRootView:rootView];

          UIEdgeInsets newContentInset = scrollView.contentInset;
          newContentInset.bottom = newBottomOffset;
          UIEdgeInsets newScrollIndicatorInsets = scrollView.verticalScrollIndicatorInsets;
          newScrollIndicatorInsets.bottom = newBottomOffset;

          [scrollView setContentInset:newContentInset];
          [scrollView setVerticalScrollIndicatorInsets:newScrollIndicatorInsets];
          [scrollView
              setContentOffset:CGPointMake(scrollView.contentOffset.x, scrollView.contentOffset.y + scrollToOffset)];
        }
        onComplete:^{
          [primaryAnimator completeAnimationWithNewBottomOffset:newBottomOffset shouldSaveCurrentAppliedOffset:NO];
          self->bottomOffset = newBottomOffset;
        }];
}

- (void)removeOffsetInScrollView:(UIScrollView *)scrollView withRootView:(UIView *)rootView
{
    UIEdgeInsets initialScrollViewContentInset = scrollView.contentInset;
    UIEdgeInsets initialScrollViewScrollIndicatorInsets = scrollView.verticalScrollIndicatorInsets;

    [self runAnimatorWithDuration:_hideDuration
        delay:_hideDelay
        easing:_easingOption
        onStart:^{
          [self->hideAnimator beginAnimationWithInitialOffset:self->bottomOffset addedOffset:-self->bottomOffset];
          [self->showAnimator cleanup];
        }
        onAnimate:^{
          [self->hideAnimator setupAnimationTimersWithRootView:rootView];

          [scrollView setContentInset:self->scrollContentInset];
          [scrollView setVerticalScrollIndicatorInsets:self->scrollIndicatorInsets];
          self->scrollContentInset = UIEdgeInsetsZero;
          self->scrollIndicatorInsets = UIEdgeInsetsZero;
        }
        onComplete:^{
          BOOL areContentInsetsEqual =
              UIEdgeInsetsEqualToEdgeInsets(initialScrollViewContentInset, scrollView.contentInset);
          BOOL areScrollIndicatorInsetsEqual = UIEdgeInsetsEqualToEdgeInsets(
              initialScrollViewScrollIndicatorInsets, scrollView.verticalScrollIndicatorInsets);
          if (areContentInsetsEqual && areScrollIndicatorInsetsEqual) {
              /// https://github.com/mateusz1913/react-native-avoid-softinput/issues/54
              /// Handle case when user tries to swipe-to-dismiss screen, but finally aborts it
              [self->hideAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                        shouldSaveCurrentAppliedOffset:NO];
          } else {
              self->bottomOffset = 0;
              [self->hideAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                        shouldSaveCurrentAppliedOffset:YES];
              self->softInputVisible = NO;
              self->lastFocusedView = nil;
          }
        }];
}

- (void)addOffsetInScrollView:(UIScrollView *)scrollView
                       offset:(CGFloat)offset
                 withRootView:(UIView *)rootView
            andFirstResponder:(UIView *)firstResponder

{
    CGFloat scrollViewDistanceToBottom = [scrollView getDistanceToBottomEdgeInRootView:rootView];
    CGFloat scrollToOffset = [self getScrollOffsetWithSoftInputHeight:offset
                                                       firstResponder:firstResponder
                                                           scrollView:scrollView
                                                             rootView:rootView];

    CGFloat newOffset = MAX(offset - scrollViewDistanceToBottom, 0);
    if (newOffset <= 0) {
        wasAddOffsetInScrollViewAborted = YES;
        return;
    }

    wasAddOffsetInScrollViewAborted = NO;
    bottomOffset = newOffset + self.avoidOffset;

    if (!softInputVisible) {
        /// Save original scroll insets
        scrollContentInset = scrollView.contentInset;
        scrollIndicatorInsets = scrollView.verticalScrollIndicatorInsets;
    }

    [self runAnimatorWithDuration:_showDuration
        delay:_showDelay
        easing:_easingOption
        onStart:^{
          [self->showAnimator beginAnimationWithInitialOffset:0 addedOffset:self->bottomOffset];
          self->softInputVisible = YES;
          [self->hideAnimator cleanup];
        }
        onAnimate:^{
          [self->showAnimator setupAnimationTimersWithRootView:rootView];

          UIEdgeInsets newContentInset = scrollView.contentInset;
          newContentInset.bottom = MAX(self->bottomOffset, scrollView.contentInset.bottom);
          UIEdgeInsets newScrollIndicatorInsets = scrollView.verticalScrollIndicatorInsets;
          newScrollIndicatorInsets.bottom = MAX(self->bottomOffset, scrollView.verticalScrollIndicatorInsets.bottom);

          [scrollView setContentInset:newContentInset];
          [scrollView setVerticalScrollIndicatorInsets:newScrollIndicatorInsets];
          [scrollView
              setContentOffset:CGPointMake(scrollView.contentOffset.x, scrollView.contentOffset.y + scrollToOffset)];
        }
        onComplete:^{
          [self->showAnimator completeAnimationWithNewBottomOffset:self->bottomOffset
                                    shouldSaveCurrentAppliedOffset:YES];
        }];
}

- (CGFloat)getScrollOffsetWithSoftInputHeight:(CGFloat)softInputHeight
                               firstResponder:(UIView *)firstResponder
                                   scrollView:(UIScrollView *)scrollView
                                     rootView:(UIView *)rootView
{
    CGPoint firstResponderPosition = [firstResponder getPositionInSuperview];
    CGPoint scrollViewPosition = [scrollView getPositionInSuperview];
    CGFloat firstResponderBottomEdgeY = firstResponderPosition.y + firstResponder.frame.size.height;
    CGFloat firstResponderDistanceToBottom =
        [rootView getScreenHeight] - firstResponderBottomEdgeY - rootView.safeAreaInsets.bottom;

    return MIN(
        MAX(softInputHeight - firstResponderDistanceToBottom, 0), firstResponderPosition.y - scrollViewPosition.y);
}

@end
