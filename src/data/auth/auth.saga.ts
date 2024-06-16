import { PayloadAction } from '@reduxjs/toolkit';
import { signInFailed, signInStart, signInSuccess } from './auth.slice';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { login } from '@/utils/api/auth/repository';
import { SignInInput } from '@/pages/auth/sign-in';
import { setLocalStorageItem } from '@/utils/helpers/local-storage';
import { UserLoginResponse } from '@/utils/api/auth/types';
import { setSessionStorageItem } from '@/utils/helpers/session-storage';

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

function* onSignInStart(): Generator {
  yield takeLatest(signInStart.type, signIn);
}

export default function* authSaga(): Generator {
  yield all([call(onSignInStart)]);
}
