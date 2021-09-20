#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AvoidSoftInputViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(avoidOffset, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputAppliedOffsetChange, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHidden, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputShown, RCTDirectEventBlock)

@end
