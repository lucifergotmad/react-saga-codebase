import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserData, AuthState, SignInInput, SignUpInput } from '@/modules/auth';

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
    signOutStart(state: AuthState, _action: PayloadAction) {
      state.isLoading = true;
    },
    signOutSuccess(state: AuthState, _action: PayloadAction) {
      state.currentUser = null;
      state.isLoading = false;
    },
    signOutFailed(state: AuthState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    signUpStart(state: AuthState, _action: PayloadAction<SignUpInput>) {
      state.isLoading = true;
    },
    signUpSuccess(state: AuthState, _action: PayloadAction) {
      state.isLoading = false;
    },
    signUpFailed(state: AuthState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    isUnauthorized(_state: AuthState, _action: PayloadAction) {},
  },
});

const authReducer = authSlice.reducer;

const {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  isUnauthorized,
} = authSlice.actions;

export {
  signInStart,
  signInSuccess,
  signInFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  isUnauthorized,
  INITAL_STATE,
  authReducer,
};
