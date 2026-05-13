import type { CodegenTypes, HostComponent, ViewProps } from 'react-native';
import { codegenNativeComponent } from 'react-native';

type SoftInputEventData = Readonly<{
  softInputHeight: CodegenTypes.Int32;
}>;

type SoftInputAppliedOffsetEventData = Readonly<{
  appliedOffset: CodegenTypes.Int32;
}>;

type SoftInputEasing = 'easeIn' | 'easeInOut' | 'easeOut' | 'linear';

interface AvoidSoftInputViewProps extends ViewProps {
  /**
   * @default 0
   */
  avoidOffset?: CodegenTypes.WithDefault<CodegenTypes.Float, 0>;
  /**
   * @default 'linear'
   */
  easing?: CodegenTypes.WithDefault<SoftInputEasing, 'linear'>;
  /**
   * @default true
   */
  enabled?: CodegenTypes.WithDefault<boolean, true>;
  /**
   * @default (300/0) ms (iOS/Android)
   */
  hideAnimationDelay?: CodegenTypes.WithDefault<CodegenTypes.Int32, 300>;
  /**
   * @default 220 ms
   */
  hideAnimationDuration?: CodegenTypes.WithDefault<CodegenTypes.Int32, 220>;
  /**
   * @default 0 ms
   */
  showAnimationDelay?: CodegenTypes.WithDefault<CodegenTypes.Int32, 0>;
  /**
   * @default 660 ms
   */
  showAnimationDuration?: CodegenTypes.WithDefault<CodegenTypes.Int32, 660>;
  onSoftInputAppliedOffsetChange?: CodegenTypes.DirectEventHandler<SoftInputAppliedOffsetEventData>;
  onSoftInputHeightChange?: CodegenTypes.DirectEventHandler<SoftInputEventData>;
  onSoftInputHidden?: CodegenTypes.DirectEventHandler<SoftInputEventData>;
  onSoftInputShown?: CodegenTypes.DirectEventHandler<SoftInputEventData>;
}

export default codegenNativeComponent<AvoidSoftInputViewProps>(
  'AvoidSoftInputView',
) as HostComponent<AvoidSoftInputViewProps>;
