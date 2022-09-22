import { useEffect, useReducer } from 'react';

import { AvoidSoftInput } from './AvoidSoftInput';
import type { State } from './stateReducer';
import { createAction, initialState, reducer } from './stateReducer';
import type { SoftInputAppliedOffsetEventData, SoftInputEventData } from './types';

export function useSoftInputAppliedOffsetChanged(
  callback: ({ appliedOffset }: SoftInputAppliedOffsetEventData) => void
) {
  useEffect(() => {
    const unsubscribeAppliedOffsetChanged = AvoidSoftInput.onSoftInputAppliedOffsetChange(callback);

    return () => {
      unsubscribeAppliedOffsetChanged.remove();
    };
  }, [ callback ]);
}

export function useSoftInputHeightChanged(
  callback: ({ softInputHeight }: SoftInputEventData) => void
) {
  useEffect(() => {
    const unsubscribeHeightChanged = AvoidSoftInput.onSoftInputHeightChange(callback);

    return () => {
      unsubscribeHeightChanged.remove();
    };
  }, [ callback ]);
}

export function useSoftInputHidden(callback: ({ softInputHeight }: SoftInputEventData) => void) {
  useEffect(() => {
    const unsubscribeHidden = AvoidSoftInput.onSoftInputHidden(callback);

    return () => {
      unsubscribeHidden.remove();
    };
  }, [ callback ]);
}

export function useSoftInputShown(callback: ({ softInputHeight }: SoftInputEventData) => void) {
  useEffect(() => {
    const unsubscribeShown = AvoidSoftInput.onSoftInputShown(callback);

    return () => {
      unsubscribeShown.remove();
    };
  }, [ callback ]);
}

export function useSoftInputState(): State {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useSoftInputHeightChanged(({ softInputHeight }) => {
    dispatch(createAction(softInputHeight));
  });

  return state;
}
