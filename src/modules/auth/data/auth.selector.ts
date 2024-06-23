import { createSelector } from 'reselect';

import { RootState } from '@/app/root-state';
import { AuthState } from '@/modules/auth';

export const selectAuthReducer = (state: RootState): AuthState => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthReducer,
  (auth) => auth.currentUser,
);
