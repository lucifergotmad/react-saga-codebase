import { PayloadAction } from '@reduxjs/toolkit';
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
} from '@data/auth/auth.slice';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { login, register } from '@/utils/api/auth/repository';
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/helpers/local-storage';
import { UserLoginResponse } from '@/utils/api/auth/types';
import {
  removeSessionStorageItem,
  setSessionStorageItem,
} from '@/utils/helpers/session-storage';
import { SignUpInput } from '@/pages/auth/sign-up';
import { navigateTo } from '../routes/navigation.slice';
import { SignInInput } from '@/pages/auth/sign-in/components/auth-form';

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
    yield put(signOutFailed(errorMessage));
  }
}

function* signUp({
  payload: { username, password, confirmPassword },
}: PayloadAction<SignUpInput>): Generator<
  CallEffect | PutEffect,
  void,
  unknown
> {
  try {
    yield call(register, { username, password, confirmPassword });

    yield put(signUpSuccess());
    yield put(navigateTo('/auth/sign-in'));
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

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

export default function* authSaga(): Generator {
  yield all([call(watchSignIn), call(watchSignOut), call(watchSignUp)]);
}
