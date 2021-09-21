import type { EmitterSubscription } from 'react-native';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

import type { SoftInputAppliedOffsetEventData, SoftInputEasing, SoftInputEventData } from './types';

const eventEmitter = new NativeEventEmitter(NativeModules.AvoidSoftInput);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

/**
 * Fires event with current soft input height, when soft input is shown
 */
function onSoftInputShown(
  listener: ({ softInputHeight }: SoftInputEventData) => void
): EmitterSubscription {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return { remove: NOOP } as EmitterSubscription;
  }

  return eventEmitter.addListener('softInputShown', listener);
}

/**
 * Fires event when soft input is hidden
 */
function onSoftInputHidden(
  listener: ({ softInputHeight }: SoftInputEventData) => void
) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return { remove: NOOP } as EmitterSubscription;
  }

  return eventEmitter.addListener('softInputHidden', listener);
}

/**
 * Fires event when soft input height changed
 */
function onSoftInputAppliedOffsetChange(
  listener: ({ appliedOffset }: SoftInputAppliedOffsetEventData) => void
) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return { remove: NOOP } as EmitterSubscription;
  }

  return eventEmitter.addListener('softInputAppliedOffsetChanged', listener);
}

/**
 * Set whether module is enabled
 */
function setEnabled(enabled: boolean) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return;
  }

  NativeModules.AvoidSoftInput.setEnabled(enabled);
}

/**
 * Sets additional offset that will be added to value applied to root view/scroll view
 * 
 * Can be negative (then final value will be smaller, so that some part of focused view will be covered by soft input frame)
 */
function setAvoidOffset(offset: number) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return;
  }

  NativeModules.AvoidSoftInput.setAvoidOffset(offset);
}

/**
 * Sets easing function that will be applied to applied offset animation, default is `linear`
 */
function setEasing(easing: SoftInputEasing) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return;
  }

  NativeModules.AvoidSoftInput.setEasing(easing);
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

  NativeModules.AvoidSoftInput.setAdjustNothing();
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

  NativeModules.AvoidSoftInput.setAdjustPan();
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

  NativeModules.AvoidSoftInput.setAdjustResize();
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

  NativeModules.AvoidSoftInput.setAdjustUnspecified();
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

  NativeModules.AvoidSoftInput.setDefaultAppSoftInputMode();
}

export const AvoidSoftInput = {
  onSoftInputAppliedOffsetChange,
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
};
