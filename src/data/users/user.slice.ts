import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserList, UserState } from './user.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';

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
  },
});

const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
} = userSlice.actions;

export {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
};

export default userSlice.reducer;
