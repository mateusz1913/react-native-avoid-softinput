import * as React from 'react';
import type { HostComponent } from 'react-native';
import { View } from 'react-native';

import type { AvoidSoftInputViewProps } from './types';

const NativeAvoidSoftInputView: HostComponent<AvoidSoftInputViewProps> = View;

/**
 * Regular View component which is listening for soft input events and manages whether
 * it should avoid soft input
 */
export default class AvoidSoftInputView extends React.Component<AvoidSoftInputViewProps> {
  render() {
    return <NativeAvoidSoftInputView {...this.props} />;
  }
}
