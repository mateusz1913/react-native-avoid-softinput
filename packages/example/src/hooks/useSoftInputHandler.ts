import type { SoftInputAppliedOffsetEvent, SoftInputEvent } from 'react-native-avoid-softinput';
import type { ReanimatedEvent } from 'react-native-reanimated';
import { useEvent, useHandler } from 'react-native-reanimated';

export function useSoftInputAppliedOffsetHandler<TContext extends Record<string, unknown>>(
  handlers: {
    onSoftInputAppliedOffsetChange?: (e: ReanimatedEvent<SoftInputAppliedOffsetEvent>, context: TContext) => void;
  },
  dependencies?: Array<unknown>,
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);

  return useEvent<SoftInputAppliedOffsetEvent>(
    event => {
      'worklet';
      const { onSoftInputAppliedOffsetChange } = handlers;

      if (onSoftInputAppliedOffsetChange && event.eventName.endsWith('onSoftInputAppliedOffsetChange')) {
        onSoftInputAppliedOffsetChange(event, context);
      }
    },
    ['onSoftInputAppliedOffsetChange'],
    doDependenciesDiffer,
  );
}

export function useSoftInputHandler<TContext extends Record<string, unknown>>(
  handlers: {
    onSoftInputHidden?: (e: ReanimatedEvent<SoftInputEvent>, context: TContext) => void;
    onSoftInputShown?: (e: ReanimatedEvent<SoftInputEvent>, context: TContext) => void;
    onSoftInputHeightChange?: (e: ReanimatedEvent<SoftInputEvent>, context: TContext) => void;
  },
  dependencies?: Array<unknown>,
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);

  return useEvent<SoftInputEvent>(
    event => {
      'worklet';
      const { onSoftInputHidden, onSoftInputShown, onSoftInputHeightChange } = handlers;

      if (onSoftInputHidden && event.eventName.endsWith('onSoftInputHidden')) {
        onSoftInputHidden(event, context);
      }

      if (onSoftInputShown && event.eventName.endsWith('onSoftInputShown')) {
        onSoftInputShown(event, context);
      }

      if (onSoftInputHeightChange && event.eventName.endsWith('onSoftInputHeightChange')) {
        onSoftInputHeightChange(event, context);
      }
    },
    ['onSoftInputHidden', 'onSoftInputShown', 'onSoftInputHeightChange'],
    doDependenciesDiffer,
  );
}
