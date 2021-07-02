import { NativeEventEmitter, NativeModules, Platform } from 'react-native';

const eventEmitter = new NativeEventEmitter(NativeModules.AvoidSoftinput);

/**
 * Fires event with current soft input height, when soft input is shown
 */
export function onSoftInputShown(
  listener: ({ softInputHeight }: { softInputHeight: number }) => void
) {
  return eventEmitter.addListener('softInputShown', listener);
}

/**
 * Fires event when soft input is hidden
 */
export function onSoftInputHidden(
  listener: ({ softInputHeight }: { softInputHeight: number }) => void
) {
  return eventEmitter.addListener('softInputHidden', listener);
}

/**
 * Set whether module is enabled
 */
export function setEnabled(enabled: boolean) {
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
