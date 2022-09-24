import type { HostComponent } from 'react-native';
import { requireNativeComponent } from 'react-native';

import type { AvoidSoftInputViewProps } from './types';

declare global {
  // eslint-disable-next-line no-var
  var nativeFabricUIManager: unknown;
}

const isFabricEnabled = global.nativeFabricUIManager !== null;

const component: HostComponent<AvoidSoftInputViewProps> = isFabricEnabled
  ? require('./AvoidSoftInputViewNativeComponent').default
  : requireNativeComponent('AvoidSoftInputView');

export default component;
