import * as React from 'react';

import NativeAvoidSoftInputView from './NativeAvoidSoftInputView';
import type { AvoidSoftInputViewProps } from './types';

/**
 * Regular View component which is listening for soft input events and manages whether
 * it should avoid soft input
 */
export class AvoidSoftInputView extends React.Component<AvoidSoftInputViewProps> {
  render() {
    return <NativeAvoidSoftInputView {...this.props} />;
  }
}
