import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserList, UserState } from './user.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';
import { UserEditInput } from '@/pages/admin/user/components/user-edit.form';
import { IdType } from '@/shared/types/_id.type';

const INITIAL_STATE: UserState = {
  userList: [],
  isLoading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    getUserStart(state: UserState, _action: PayloadAction) {
      state.isLoading = true;
    },
    getUserSuccess(state: UserState, action: PayloadAction<UserList[]>) {
      state.userList = action.payload;
      state.isLoading = false;
    },
    getUserFailed(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    addUserStart(state: UserState, _action: PayloadAction<UserAddInput>) {
      state.isLoading = true;
    },
    addUserSuccess(state: UserState, _action: PayloadAction) {
      state.isLoading = false;
    },
    addUserFailed(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    editUserStart(
      state: UserState,
      _action: PayloadAction<UserEditInput & IdType>,
    ) {
      state.isLoading = true;
    },
    editUserSuccess(state: UserState, _action: PayloadAction) {
      state.isLoading = false;
    },
    editUserFailed(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    deleteUserStart(state: UserState, _action: PayloadAction<string>) {
      state.isLoading = true;
    },
    deleteUserSuccess(state: UserState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.userList = state.userList.filter(
        (user) => user._id !== action.payload,
      );
    },
    deleteUserFailed(state: UserState, action: PayloadAction<string>) {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  editUserStart,
  editUserSuccess,
  editUserFailed,
} = userSlice.actions;

export {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  editUserStart,
  editUserSuccess,
  editUserFailed,
};

export default userSlice.reducer;
