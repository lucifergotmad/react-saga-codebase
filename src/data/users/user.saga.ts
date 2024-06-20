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
import {
  addUserFailed,
  addUserStart,
  addUserSuccess,
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from './user.slice';
import { findUsers, removeUser, saveUser } from '@/utils/api/users/repository';
import { UserList } from './user.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';

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

function* addUser({
  payload,
}: PayloadAction<UserAddInput>): Generator<
  CallEffect | PutEffect,
  void,
  string
> {
  try {
    yield call(saveUser, payload);
    yield put(addUserSuccess());
    yield put(getUserStart());
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

    yield put(addUserFailed(errorMessage));
  }
}

function* deleteUser({
  payload,
}: PayloadAction<string>): Generator<CallEffect | PutEffect, void, string> {
  try {
    const message = yield call(removeUser, payload);
    yield put(deleteUserSuccess(payload));

    toast({
      title: 'Success',
      description: message,
      variant: 'default',
    });

    yield put(getUserStart());
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

    yield put(deleteUserFailed(errorMessage));
  }
}

function* watchGetUser(): Generator {
  yield takeLatest(getUserStart.type, getUser);
}

function* watchAddUser(): Generator {
  yield takeLatest(addUserStart.type, addUser);
}

function* watchDeleteUser(): Generator {
  yield takeLatest(deleteUserStart.type, deleteUser);
}

export default function* userSaga(): Generator {
  yield all([call(watchGetUser), call(watchAddUser), call(watchDeleteUser)]);
}
