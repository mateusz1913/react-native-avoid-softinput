#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

@interface AvoidSoftInputViewComponentView : RCTViewComponentView

@property (nonatomic, copy) NSNumber *avoidOffset;
@property (nonatomic, copy) NSString *easing;
@property (nonatomic, assign) BOOL enabled;
@property (nonatomic, copy) NSNumber *hideAnimationDelay;
@property (nonatomic, copy) NSNumber *hideAnimationDuration;
@property (nonatomic, copy) NSNumber *showAnimationDelay;
@property (nonatomic, copy) NSNumber *showAnimationDuration;

@end

#endif
