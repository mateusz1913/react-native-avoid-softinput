import type { EmitterSubscription } from 'react-native';
import { NativeEventEmitter, Platform } from 'react-native';

import module from './AvoidSoftInputModule';
import type { SoftInputAppliedOffsetEventData, SoftInputEasing, SoftInputEventData } from './types';

const eventEmitter = new NativeEventEmitter(Platform.OS !== 'ios' ? undefined : module);

/**
 * Fires event with current soft input height, when soft input is shown
 */
function onSoftInputShown(
  listener: ({ softInputHeight }: SoftInputEventData) => void
): EmitterSubscription {
  return eventEmitter.addListener('softInputShown', listener);
}

/**
 * Fires event when soft input is hidden
 */
function onSoftInputHidden(
  listener: ({ softInputHeight }: SoftInputEventData) => void
) {
  return eventEmitter.addListener('softInputHidden', listener);
}

/**
 * Fires event when soft input height changed
 */
function onSoftInputAppliedOffsetChange(
  listener: ({ appliedOffset }: SoftInputAppliedOffsetEventData) => void
) {
  return eventEmitter.addListener('softInputAppliedOffsetChanged', listener);
}

/**
 * Fires event when soft input's height changes
 */
function onSoftInputHeightChange(
  listener: ({ softInputHeight }: SoftInputEventData) => void
) {
  return eventEmitter.addListener('softInputHeightChanged', listener);
}

/**
 * Set whether module is enabled
 */
function setEnabled(enabled: boolean) {
  module.setEnabled(enabled);
}

/**
 * Set should mimic IOS ime behavior (true), or let Android OS handle (resize) window (false)
 * 
 * @platform `Android`
 */
function setShouldMimicIOSBehavior(shouldMimic: boolean) {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setShouldMimicIOSBehavior(shouldMimic);
}

/**
 * Sets additional offset that will be added to value applied to root view/scroll view
 * 
 * Can be negative (then final value will be smaller, so that some part of focused view will be covered by soft input frame)
 */
function setAvoidOffset(offset: number) {
  module.setAvoidOffset(offset);
}

/**
 * Sets easing function that will be applied to applied offset animation, default is `linear`
 */
function setEasing(easing: SoftInputEasing) {
  module.setEasing(easing);
}

/**
 * Sets hide animation delay, takes value in milliseconds, if no value is provided, it will set default value which is `0` ms
 */
function setHideAnimationDelay(delay?: number) {
  module.setHideAnimationDelay(delay ?? 0);
}

/**
 * Sets hide animation duration, takes value in milliseconds, if no value is provided, it will set default value which is `220` ms
 */
function setHideAnimationDuration(duration?: number) {
  module.setHideAnimationDuration(duration ?? 220);
}

/**
 * Sets show animation delay, takes value in milliseconds, if no value is provided, it will set default value which is `300` ms on iOS and `0` ms on Android
 */
function setShowAnimationDelay(delay?: number) {
  module.setShowAnimationDelay(delay ?? Platform.select({
    default: 0,
    ios: 300,
  }));
}

/**
 * Sets show animation duration, takes value in milliseconds, if no value is provided, it will set default value which is `660` ms
 */
function setShowAnimationDuration(duration?: number) {
  module.setShowAnimationDuration(duration ?? 660);
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustNothing`
 *
 * @platform `Android`
 */
function setAdjustNothing() {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setAdjustNothing();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustPan`
 *
 * @platform `Android`
 */
function setAdjustPan() {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setAdjustPan();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustResize`
 *
 * @platform `Android`
 */
function setAdjustResize() {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setAdjustResize();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustUnspecified`
 *
 * @platform `Android`
 */
function setAdjustUnspecified() {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setAdjustUnspecified();
}

/**
 * Sets `android:windowSoftInputMode` attribute to default value that is set in manifest
 *
 * @platform `Android`
 */
function setDefaultAppSoftInputMode() {
  if (Platform.OS !== 'android') {
    return;
  }

  module.setDefaultAppSoftInputMode();
}

export const AvoidSoftInput = {
  onSoftInputAppliedOffsetChange,
  onSoftInputHeightChange,
  onSoftInputHidden,
  onSoftInputShown,
  setAdjustNothing,
  setAdjustPan,
  setAdjustResize,
  setAdjustUnspecified,
  setAvoidOffset,
  setDefaultAppSoftInputMode,
  setEasing,
  setEnabled,
  setHideAnimationDelay,
  setHideAnimationDuration,
  setShouldMimicIOSBehavior,
  setShowAnimationDelay,
  setShowAnimationDuration,
};
