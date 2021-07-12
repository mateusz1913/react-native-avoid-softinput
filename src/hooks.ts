import { useEffect, useReducer } from 'react';

import { AvoidSoftInput } from './AvoidSoftInputModule';
import { createHiddenAction, createShownAction, initialState, reducer } from './stateReducer';

export function useSoftInputHidden(callback: ({ softInputHeight }: {
  softInputHeight: number;
}) => void) {
  useEffect(() => {
    const unsubscribeHidden = AvoidSoftInput.onSoftInputHidden(callback);

    return () => {
      unsubscribeHidden.remove();
    };
  }, [ callback ]);
}

export function useSoftInputShown(callback: ({ softInputHeight }: {
  softInputHeight: number;
}) => void) {
  useEffect(() => {
    const unsubscribeShown = AvoidSoftInput.onSoftInputShown(callback);

    return () => {
      unsubscribeShown.remove();
    };
  }, [ callback ]);
}

export function useSoftInputState() {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  useSoftInputHidden(() => {
    dispatch(createHiddenAction());
  });

  useSoftInputShown(({ softInputHeight }) => {
    dispatch(createShownAction(softInputHeight));
  });

  return state;
}
