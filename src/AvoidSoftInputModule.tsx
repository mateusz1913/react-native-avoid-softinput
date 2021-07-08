import type { EmitterSubscription } from 'react-native';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.AvoidSoftInput);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

/**
 * Fires event with current soft input height, when soft input is shown
 */
function onSoftInputShown(
  listener: ({ softInputHeight }: { softInputHeight: number }) => void
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
  listener: ({ softInputHeight }: { softInputHeight: number }) => void
) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return { remove: NOOP } as EmitterSubscription;
  }

  return eventEmitter.addListener('softInputHidden', listener);
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
  onSoftInputHidden,
  onSoftInputShown,
  setAdjustNothing,
  setAdjustPan,
  setAdjustResize,
  setAdjustUnspecified,
  setAvoidOffset,
  setDefaultAppSoftInputMode,
  setEnabled,
};
