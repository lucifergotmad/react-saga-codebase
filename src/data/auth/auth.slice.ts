import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SignInInput } from '@/pages/auth/sign-in';
import { UserData, AuthState } from './auth.type';

const INITAL_STATE: AuthState = {
  currentUser: null,
  isLoading: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITAL_STATE,
  reducers: {
    signInStart(state: AuthState, _action: PayloadAction<SignInInput>) {
      state.isLoading = true;
    },
    signInSuccess(state: AuthState, action: PayloadAction<UserData>) {
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    signInFailed(state: AuthState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
  },
});

const { signInStart, signInSuccess, signInFailed } = authSlice.actions;
export { signInStart, signInSuccess, signInFailed, INITAL_STATE };

export default authSlice.reducer;
