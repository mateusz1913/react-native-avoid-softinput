import type { SoftInputAppliedOffsetEventData, SoftInputEventData } from 'react-native-avoid-softinput';
import { useEvent, useHandler } from 'react-native-reanimated';

interface CustomSoftInputEventData extends SoftInputEventData {
  eventName: string;
}

interface CustomSoftInputAppliedOffsetEventData extends SoftInputAppliedOffsetEventData {
  eventName: string;
}

export function useSoftInputAppliedOffsetHandler<TContext extends Record<string, unknown>>(
  handlers: {
    onSoftInputAppliedOffsetChange?: (e: SoftInputAppliedOffsetEventData, context: TContext) => void;
  },
  dependencies?: ReadonlyArray<unknown>
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);

  return useEvent<SoftInputAppliedOffsetEventData>(
    (event) => {
      'worklet';
      const { onSoftInputAppliedOffsetChange } = handlers;

      // eslint-disable-next-line no-extra-parens
      if (onSoftInputAppliedOffsetChange && (event as CustomSoftInputAppliedOffsetEventData).eventName.endsWith('onSoftInputAppliedOffsetChange')) {
        onSoftInputAppliedOffsetChange(event, context);
      }
    },
    [ 'onSoftInputAppliedOffsetChange' ],
    doDependenciesDiffer,  
  );
}

export function useSoftInputHandler<TContext extends Record<string, unknown>>(
  handlers: {
    onSoftInputHidden?: (e: SoftInputEventData, context: TContext) => void;
    onSoftInputShown?: (e: SoftInputEventData, context: TContext) => void;
  },
  dependencies?: ReadonlyArray<unknown>
) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);

  return useEvent<SoftInputEventData>(
    (event) => {
      'worklet';
      const { onSoftInputHidden, onSoftInputShown } = handlers;

      // eslint-disable-next-line no-extra-parens
      if (onSoftInputHidden && (event as CustomSoftInputEventData).eventName.endsWith('onSoftInputHidden')) {
        onSoftInputHidden(event, context);
      }

      // eslint-disable-next-line no-extra-parens
      if (onSoftInputShown && (event as CustomSoftInputEventData).eventName.endsWith('onSoftInputShown')) {
        onSoftInputShown(event, context);
      }
    },
    [ 'onSoftInputHidden', 'onSoftInputShown' ],
    doDependenciesDiffer,  
  );
}
