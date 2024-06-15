import { PayloadAction } from '@reduxjs/toolkit';
import { signInFailed, signInStart, signInSuccess } from './user.slice';
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
import { UserData } from './user.type';

function* signIn({
  payload: { username, password },
}: PayloadAction<SignInInput>): Generator<
  CallEffect | PutEffect,
  void,
  UserData
> {
  try {
    const userData = yield call(login, { username, password });

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

export default function* userSaga(): Generator {
  yield all([call(onSignInStart)]);
}
