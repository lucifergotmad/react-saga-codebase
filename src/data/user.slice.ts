import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserData, UserState } from './user.type';
import { SignInInput } from '@/pages/auth/sign-in';

const INITAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  errorMessage: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState: INITAL_STATE,
  reducers: {
    signInStart(state: UserState, _action: PayloadAction<SignInInput>) {
      state.isLoading = true;
    },
    signInSuccess(state: UserState, action: PayloadAction<UserData>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    signInFailed(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

const { signInStart, signInSuccess, signInFailed } = userSlice.actions;
export { signInStart, signInSuccess, signInFailed };

export default userSlice.reducer;
