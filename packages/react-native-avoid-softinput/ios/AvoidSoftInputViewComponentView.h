#ifdef RCT_NEW_ARCH_ENABLED

#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

// Does not work https://github.com/CocoaPods/CocoaPods/issues/10544
//@class AvoidSoftInputView;

@interface AvoidSoftInputViewComponentView : RCTViewComponentView

@property (nonatomic, retain) NSNumber *avoidOffset;
@property (nonatomic, retain) NSString *easing;
@property (nonatomic) BOOL enabled;
@property (nonatomic, retain) NSNumber *hideAnimationDelay;
@property (nonatomic, retain) NSNumber *hideAnimationDuration;
@property (nonatomic, retain) NSNumber *showAnimationDelay;
@property (nonatomic, retain) NSNumber *showAnimationDuration;

@end

#endif
