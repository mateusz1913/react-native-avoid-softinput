import { useEffect, useReducer } from 'react';

import { AvoidSoftInput } from './AvoidSoftInputModule';
import type { State } from './stateReducer';
import { createHiddenAction, createShownAction, initialState, reducer } from './stateReducer';
import type { SoftInputAppliedOffsetEventData, SoftInputEventData } from './types';

export function useSoftInputAppliedOffsetChanged(
  callback: ({ appliedOffset }: SoftInputAppliedOffsetEventData) => void
) {
  useEffect(() => {
    const unsubscribeHeightChanged = AvoidSoftInput.onSoftInputAppliedOffsetChange(callback);

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

  useSoftInputHidden(() => {
    dispatch(createHiddenAction());
  });

  useSoftInputShown(({ softInputHeight }) => {
    dispatch(createShownAction(softInputHeight));
  });

  return state;
}
