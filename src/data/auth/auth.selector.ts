import { createSelector } from 'reselect';
import { RootState } from '@/config/root-state';
import { AuthState } from './auth.type';

export const selectAuthReducer = (state: RootState): AuthState => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthReducer,
  (auth) => auth.currentUser,
);
