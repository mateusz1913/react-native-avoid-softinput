import type { EmitterSubscription } from 'react-native';
import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.AvoidSoftinput);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

/**
 * Fires event with current soft input height, when soft input is shown
 */
export function onSoftInputShown(
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
export function onSoftInputHidden(
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
export function setEnabled(enabled: boolean) {
  if (![ 'android', 'ios' ].includes(Platform.OS)) {
    return;
  }

  NativeModules.AvoidSoftinput.setEnabled(enabled);
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustNothing`
 *
 * @platform `Android`
 */
export function setAdjustNothing() {
  if (Platform.OS !== 'android') {
    return;
  }

  NativeModules.AvoidSoftinput.setAdjustNothing();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustPan`
 *
 * @platform `Android`
 */
export function setAdjustPan() {
  if (Platform.OS !== 'android') {
    return;
  }

  NativeModules.AvoidSoftinput.setAdjustPan();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustResize`
 *
 * @platform `Android`
 */
export function setAdjustResize() {
  if (Platform.OS !== 'android') {
    return;
  }

  NativeModules.AvoidSoftinput.setAdjustResize();
}

/**
 * Sets `android:windowSoftInputMode` attribute to `adjustUnspecified`
 *
 * @platform `Android`
 */
export function setAdjustUnspecified() {
  if (Platform.OS !== 'android') {
    return;
  }

  NativeModules.AvoidSoftinput.setAdjustUnspecified();
}

/**
 * Sets `android:windowSoftInputMode` attribute to default value that is set in manifest
 *
 * @platform `Android`
 */
export function setDefaultAppSoftInputMode() {
  if (Platform.OS !== 'android') {
    return;
  }

  NativeModules.AvoidSoftinput.setDefaultAppSoftInputMode();
}
