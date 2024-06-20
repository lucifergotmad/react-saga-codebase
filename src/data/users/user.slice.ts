import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User, UserState } from './user.type';

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
    getUserSuccess(state: UserState, action: PayloadAction<User[]>) {
      state.userList = action.payload;
      state.isLoading = false;
    },
    getUserFailed(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    addUserStart(state: UserState, _action: PayloadAction) {
      state.isLoading = true;
    },
  },
});

export default userSlice.reducer;
