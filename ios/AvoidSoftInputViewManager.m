#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(AvoidSoftInputViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(avoidOffset, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputHidden, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSoftInputShown, RCTBubblingEventBlock)

@end
