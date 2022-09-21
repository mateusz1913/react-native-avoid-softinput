import type { EmitterSubscription, NativeEventEmitter } from 'react-native';

import type { Module } from './NativeAvoidSoftInputModuleType';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

export const module: Module = {
  addListener: NOOP,
  removeListeners: NOOP,
  setAdjustNothing: NOOP,
  setAdjustPan: NOOP,
  setAdjustResize: NOOP,
  setAdjustUnspecified: NOOP,
  setAvoidOffset: NOOP,
  setDefaultAppSoftInputMode: NOOP,
  setEasing: NOOP,
  setEnabled: NOOP,
  setHideAnimationDelay: NOOP,
  setHideAnimationDuration: NOOP,
  setShouldMimicIOSBehavior: NOOP,
  setShowAnimationDelay: NOOP,
  setShowAnimationDuration: NOOP,
};

export const eventEmitter: NativeEventEmitter = {
  addListener: () => ({ remove: NOOP } as EmitterSubscription),
  emit: NOOP,
  listenerCount: () => 0,
  removeAllListeners: NOOP,
  removeSubscription: NOOP,
  removeListener: NOOP,
};
