import React from 'react';
import type { NativeSyntheticEvent, ViewProps } from 'react-native';
import { requireNativeComponent } from 'react-native';

export interface AvoidSoftInputViewProps extends Omit<ViewProps, 'pointerEvents'> {
  avoidOffset?: number;
  onSoftInputHidden?: (e: NativeSyntheticEvent<{ softInputHeight: number }>) => void;
  onSoftInputShown?: (e: NativeSyntheticEvent<{ softInputHeight: number }>) => void;
}

const NativeSoftInputView = requireNativeComponent<AvoidSoftInputViewProps>('AvoidSoftInputView');

/**
 * Regular View component which is listening for soft input events and manages whether
 * it should avoid soft input
 */
export const AvoidSoftInputView: React.FC<AvoidSoftInputViewProps> = (props) => {
  return <NativeSoftInputView {...props} />;
};