import { toast } from '@/shared/components/design/use-toast';
import { PaginationType } from '@/shared/types/pagination.type';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { getUserFailed, getUserStart, getUserSuccess } from './user.slice';
import { findUsers } from '@/utils/api/users/repository';
import { UserList } from './user.type';

function* getUser({
  payload,
}: PayloadAction<PaginationType>): Generator<
  CallEffect | PutEffect,
  void,
  UserList[]
> {
  try {
    const userList = yield call(findUsers, payload);
    yield put(getUserSuccess(userList));
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

    yield put(getUserFailed(errorMessage));
  }
}

function* watchGetUser(): Generator {
  yield takeLatest(getUserStart.type, getUser);
}

export default function* userSaga(): Generator {
  yield all([call(watchGetUser)]);
}
