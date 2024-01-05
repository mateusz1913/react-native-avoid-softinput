#import <UIKit/UIKit.h>

#import "AvoidSoftInputAnimationHandler.h"
#import "AvoidSoftInputListener.h"

@protocol AvoidSoftInputManagerDelegate <NSObject>

- (void)onOffsetChanged:(CGFloat)offset;
- (void)onHeightChanged:(CGFloat)height;
- (void)onHide:(CGFloat)height;
- (void)onShow:(CGFloat)height;

@end

@interface AvoidSoftInputManager : NSObject <AvoidSoftInputAnimationHandlerDelegate, AvoidSoftInputListenerDelegate>

@property (nonatomic, weak) id<AvoidSoftInputManagerDelegate> _Nullable delegate;
@property (nonatomic, weak) UIView *_Nullable customView;

- (void)setAvoidOffset:(CGFloat)offset;
- (void)setEasing:(UIViewAnimationOptions)easing;
- (void)setIsEnabled:(BOOL)enabled;
- (void)setHideAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setHideAnimationDuration:(NSNumber *_Nullable)duration;
- (void)setShowAnimationDelay:(NSNumber *_Nullable)delay;
- (void)setShowAnimationDuration:(NSNumber *_Nullable)duration;

- (void)initializeHandlers;
- (void)cleanupHandlers;

@end
