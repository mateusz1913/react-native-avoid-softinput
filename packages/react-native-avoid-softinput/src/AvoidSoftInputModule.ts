import { NativeModules } from 'react-native';

import type { AvoidSoftInputNativeModuleType } from './types';

declare global {
  // eslint-disable-next-line no-var, no-underscore-dangle
  var __turboModuleProxy: unknown;
}

// eslint-disable-next-line no-underscore-dangle
const isTurboModuleEnabled = global.__turboModuleProxy !== null;

const myModule: AvoidSoftInputNativeModuleType = isTurboModuleEnabled
  ? require('./NativeAvoidSoftInputModule').default
  : NativeModules.AvoidSoftInput;

export default myModule;