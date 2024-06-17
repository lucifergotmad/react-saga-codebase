import { PayloadAction } from '@reduxjs/toolkit';
import {
  signInFailed,
  signInStart,
  signInSuccess,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} from '@data/auth/auth.slice';
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
import {
  removeLocalStorageItem,
  setLocalStorageItem,
} from '@/utils/helpers/local-storage';
import { UserLoginResponse } from '@/utils/api/auth/types';
import {
  removeSessionStorageItem,
  setSessionStorageItem,
} from '@/utils/helpers/session-storage';

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

function* watchSignIn(): Generator {
  yield takeLatest(signInStart.type, signIn);
}

function* watchSignOut(): Generator {
  yield takeLatest(signOutStart.type, signOut);
}

export default function* authSaga(): Generator {
  yield all([call(watchSignIn), call(watchSignOut)]);
}
