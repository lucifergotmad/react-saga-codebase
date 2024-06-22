import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  UserList,
  UserState,
  UserAddInput,
  UserEditInput,
} from '@/modules/admin/users';
import { IdType } from '@/shared';

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

const userReducer = userSlice.reducer;

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
  userReducer,
};
