#import "RCTConvert+UIViewAnimationOptions.h"

@implementation RCTConvert (UIViewAnimationOptions)

RCT_ENUM_CONVERTER(
    UIViewAnimationOptions,
    (@{
        @"easeIn" : @(UIViewAnimationOptionCurveEaseIn),
        @"easeInOut" : @(UIViewAnimationOptionCurveEaseInOut),
        @"easeOut" : @(UIViewAnimationOptionCurveEaseOut),
        @"linear" : @(UIViewAnimationOptionCurveLinear)
    }),
    UIViewAnimationOptionCurveLinear,
    integerValue)

@end
