import type { NativeSyntheticEvent, ViewProps } from 'react-native';

export interface SoftInputEventData {
  softInputHeight: number;
}

export interface SoftInputAppliedOffsetEventData {
  appliedOffset: number;
}

export type SoftInputEasing = 'easeIn' | 'easeInOut' | 'easeOut' | 'linear';

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
   * @default true
   */
  enabled?: boolean;
  /**
   * @default (300/0) ms (iOS/Android)
   */
  hideAnimationDelay?: number;
  /**
   * @default 220 ms
   */
  hideAnimationDuration?: number;
  /**
   * @default 0 ms
   */
  showAnimationDelay?: number;
  /**
   * @default 660 ms
   */
  showAnimationDuration?: number;
  onSoftInputAppliedOffsetChange?: (e: NativeSyntheticEvent<SoftInputAppliedOffsetEventData>) => void;
  onSoftInputHeightChange?: (e: NativeSyntheticEvent<SoftInputEventData>) => void;
  onSoftInputHidden?: (e: NativeSyntheticEvent<SoftInputEventData>) => void;
  onSoftInputShown?: (e: NativeSyntheticEvent<SoftInputEventData>) => void;
}
