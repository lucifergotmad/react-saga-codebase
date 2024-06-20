import { RootState } from '@/config/root-state';
import { UserState } from './user.type';
import { createSelector } from 'reselect';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectUserList = createSelector(
  selectUserReducer,
  (user) => user.userList,
);
