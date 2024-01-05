#import <UIKit/UIKit.h>

@protocol AvoidSoftInputListenerDelegate <NSObject>

- (void)onHeightChangedWithOldSoftInputHeight:(CGFloat)oldSoftInputHeight
                           newSoftInputHeight:(CGFloat)newSoftInputHeight
                          isOrientationChange:(BOOL)isOrientationChange;

- (void)onHide:(CGFloat)height;

- (void)onShow:(CGFloat)height;

@end

@interface AvoidSoftInputListener : NSObject

@property (nonatomic, weak) id<AvoidSoftInputListenerDelegate> _Nullable delegate;

- (void)initializeHandlers;

- (void)cleanupHandlers;

@end
