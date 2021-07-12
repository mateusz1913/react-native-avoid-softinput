enum ActionKind {
  Hidden = 'HIDDEN',
  Shown = 'SHOWN',
}

interface Action {
  type: ActionKind,
  payload: number;
}

export function createHiddenAction(): Action {
  return {
    type: ActionKind.Hidden,
    payload: 0,
  };
}

export function createShownAction(height: number): Action {
  return {
    type: ActionKind.Shown,
    payload: height,
  };
}

interface State {
  isSoftInputShown: boolean;
  softInputHeight: number;
}

export const initialState: State = { isSoftInputShown: false, softInputHeight: 0 };

export function reducer(state: State, action: Action): State {
  if (action.type === ActionKind.Hidden) {
    return { ...state, isSoftInputShown: false, softInputHeight: 0 };
  }

  if (action.type === ActionKind.Shown) {
    return { ...state, isSoftInputShown: true, softInputHeight: action.payload };
  }

  return state;
}
