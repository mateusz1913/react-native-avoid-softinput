#import <Foundation/Foundation.h>

@interface AvoidSoftInputConstants : NSObject

@property (nonatomic, class, readonly) double hideAnimationDelayInSeconds;
@property (nonatomic, class, readonly) double hideAnimationDurationInSeconds;
@property (nonatomic, class, readonly) double showAnimationDelayInSeconds;
@property (nonatomic, class, readonly) double showAnimationDurationInSeconds;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputHeightKey;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputAppliedOffsetKey;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputAppliedOffsetChanged;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputHeightChanged;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputHidden;
@property (nonatomic, class, readonly, copy) NSString *_Nonnull softInputShown;

@end
