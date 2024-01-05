
#import "AvoidSoftInputConstants.h"

@implementation AvoidSoftInputConstants

+ (double)hideAnimationDelayInSeconds
{
    return 0.3;
}

+ (double)hideAnimationDurationInSeconds
{
    return 0.66;
}

+ (double)showAnimationDelayInSeconds
{
    return 0;
}

+ (double)showAnimationDurationInSeconds
{
    return 0.22;
}

+ (NSString *)softInputHeightKey
{
    return @"softInputHeight";
}

+ (NSString *)softInputAppliedOffsetKey
{
    return @"appliedOffset";
}

+ (NSString *)softInputAppliedOffsetChanged
{
    return @"softInputAppliedOffsetChanged";
}

+ (NSString *)softInputHeightChanged
{
    return @"softInputHeightChanged";
}

+ (NSString *)softInputHidden
{
    return @"softInputHidden";
}

+ (NSString *)softInputShown
{
    return @"softInputShown";
}

@end
