import { UnknownAction } from 'redux';
import { INITIAL_STATE } from './user.state';
import { signInFailed, signInSuccess } from './user.action';

export const userReducer = (
  state = INITIAL_STATE,
  action = {} as UnknownAction,
) => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if (signInFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
};
