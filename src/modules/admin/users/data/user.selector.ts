import { createSelector } from 'reselect';

import { RootState } from '@/app/root-state';
import { UserState } from '@/modules/admin/users';

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectUserList = createSelector(
  selectUserReducer,
  (user) => user.userList,
);
