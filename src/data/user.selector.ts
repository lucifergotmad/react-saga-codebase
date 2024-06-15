import { createSelector } from 'reselect';
import { RootState } from '@/config/root-state';
import { UserState } from './user.type';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser,
);
