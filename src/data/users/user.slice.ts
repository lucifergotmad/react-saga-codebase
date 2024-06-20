import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserList, UserState } from './user.type';

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
  },
});

const { getUserStart, getUserSuccess, getUserFailed } = userSlice.actions;

export { getUserStart, getUserSuccess, getUserFailed };

export default userSlice.reducer;
