import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  signInFailed,
  signInStart,
  signInSuccess,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  signUpFailed,
  signUpSuccess,
  signUpStart,
  UserLoginResponse,
  login,
  register,
  SignInInput,
  SignUpInput,
} from '@/modules/auth';
import { toast } from '@/shared/components/design/use-toast';
import {
  removeLocalStorageItem,
  removeSessionStorageItem,
  setLocalStorageItem,
  setSessionStorageItem,
} from '@/utils';
import { navigateTo } from '@/app/data';

function* signIn({
  payload: { username, password, rememberMe },
}: PayloadAction<SignInInput>): Generator<
  CallEffect | PutEffect,
  void,
  UserLoginResponse
> {
  try {
    const { accessToken, refreshToken, ...userData } = yield call(login, {
      username,
      password,
    });

    if (rememberMe) {
      yield call(setLocalStorageItem, 'token', {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      yield call(setSessionStorageItem, 'token', {
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }

    yield put(signInSuccess(userData));
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });

    yield put(signInFailed(errorMessage));
  }
}

function* signOut(): Generator {
  try {
    yield call(removeLocalStorageItem, 'token');
    yield call(removeSessionStorageItem, 'token');

    yield put(signOutSuccess());
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });

    yield put(signOutFailed(errorMessage));
  }
}

function* signUp({
  payload: { username, password, confirmPassword, email, fullname },
}: PayloadAction<SignUpInput>): Generator<
  CallEffect | PutEffect,
  void,
  unknown
> {
  try {
    yield call(register, {
      username,
      password,
      confirmPassword,
      email,
      fullname,
    });

    yield put(signUpSuccess());
    yield put(navigateTo('/auth/sign-in'));
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });

    yield put(signUpFailed(errorMessage));
  }
}

function* watchSignIn(): Generator {
  yield takeLatest(signInStart.type, signIn);
}

function* watchSignOut(): Generator {
  yield takeLatest(signOutStart.type, signOut);
}

function* watchSignUp(): Generator {
  yield takeLatest(signUpStart.type, signUp);
}

export function* authSaga(): Generator {
  yield all([call(watchSignIn), call(watchSignOut), call(watchSignUp)]);
}
