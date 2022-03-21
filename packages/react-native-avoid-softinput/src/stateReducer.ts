interface Action {
  payload: number;
}

export function createAction(payload: number): Action {
  return { payload };
}

export interface State {
  isSoftInputShown: boolean;
  softInputHeight: number;
}

export const initialState: State = { isSoftInputShown: false, softInputHeight: 0 };

export function reducer(state: State, action: Action): State {
  if (action.payload === 0) {
    return { ...state, isSoftInputShown: false, softInputHeight: action.payload };
  }

  if (!state.isSoftInputShown) {
    return { ...state, isSoftInputShown: true, softInputHeight: action.payload };
  }

  return { ...state, softInputHeight: action.payload };
}
