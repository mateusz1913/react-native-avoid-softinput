import React from 'react';
import type { NativeSyntheticEvent, ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

import type { SoftInputAppliedOffsetEventData, SoftInputEasing, SoftInputEventData } from './types';

export interface AvoidSoftInputViewProps extends Omit<ViewProps, 'pointerEvents'> {
  /**
   * @default 0
   */
  avoidOffset?: number;
  /**
   * @default 'linear'
   */
  easing?: SoftInputEasing;
  /**
   * @default 0 ms
   */
  hideAnimationDelay?: number;
  /**
   * @default 220 ms
   */
  hideAnimationDuration?: number;
  /**
   * @default (300/0) ms (iOS/Android)
   */
  showAnimationDelay?: number;
  /**
   * @default 660 ms
   */
  showAnimationDuration?: number;
  onSoftInputAppliedOffsetChange?: (e: NativeSyntheticEvent<SoftInputAppliedOffsetEventData>) => void;
  onSoftInputHidden?: (e: NativeSyntheticEvent<SoftInputEventData>) => void;
  onSoftInputShown?: (e: NativeSyntheticEvent<SoftInputEventData>) => void;
}

const NativeSoftInputView = requireNativeComponent<AvoidSoftInputViewProps>('AvoidSoftInputView');

/**
 * Regular View component which is listening for soft input events and manages whether
 * it should avoid soft input
 */
export class AvoidSoftInputView extends React.Component<AvoidSoftInputViewProps> {
  render() {
    return <NativeSoftInputView {...this.props} />;
  }
}
