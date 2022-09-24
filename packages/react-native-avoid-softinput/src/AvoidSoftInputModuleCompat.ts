import type { AvoidSoftInputNativeModuleType } from './types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = () => {};

const myModule: AvoidSoftInputNativeModuleType = {
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

export default myModule;