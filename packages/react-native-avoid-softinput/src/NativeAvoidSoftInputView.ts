import type { HostComponent } from 'react-native';

import type { AvoidSoftInputViewProps } from './types';

const component: HostComponent<AvoidSoftInputViewProps> = require('./AvoidSoftInputViewNativeComponent').default;

export default component;
