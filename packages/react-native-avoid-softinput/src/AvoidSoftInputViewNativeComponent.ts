import type { HostComponent, ViewProps } from 'react-native';
import type { DirectEventHandler, Float, Int32, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

type SoftInputEventData = Readonly<{
  softInputHeight: Int32;
}>

type SoftInputAppliedOffsetEventData = Readonly<{
  appliedOffset: Int32;
}>

type SoftInputEasing = 'easeIn' | 'easeInOut' | 'easeOut' | 'linear';

interface AvoidSoftInputViewProps extends ViewProps {
  /**
   * @default 0
   */
  avoidOffset?: WithDefault<Float, 0>;
  /**
   * @default 'linear'
   */
  easing?: WithDefault<SoftInputEasing, 'linear'>;
  /**
   * @default true
   */
  enabled?: WithDefault<boolean, true>;
  /**
   * @default (300/0) ms (iOS/Android)
   */
  hideAnimationDelay?: WithDefault<Int32, 300>;
  /**
   * @default 220 ms
   */
  hideAnimationDuration?: WithDefault<Int32, 220>;
  /**
   * @default 0 ms
   */
  showAnimationDelay?: WithDefault<Int32, 0>;
  /**
   * @default 660 ms
   */
  showAnimationDuration?: WithDefault<Int32, 660>;
  onSoftInputAppliedOffsetChange?: DirectEventHandler<SoftInputAppliedOffsetEventData>;
  onSoftInputHeightChange?: DirectEventHandler<SoftInputEventData>;
  onSoftInputHidden?: DirectEventHandler<SoftInputEventData>;
  onSoftInputShown?: DirectEventHandler<SoftInputEventData>;
}

export default codegenNativeComponent<AvoidSoftInputViewProps>('AvoidSoftInputView') as HostComponent<AvoidSoftInputViewProps>;
