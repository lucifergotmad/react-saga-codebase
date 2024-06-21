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
  editUserFailed,
  editUserStart,
  editUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from './user.slice';
import {
  findUsers,
  removeUser,
  saveUser,
  updateUser,
} from '@/utils/api/users/repository';
import { UserList } from './user.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';
import { UserEditInput } from '@/pages/admin/user/components/user-edit.form';
import { IdType } from '@/shared/types/_id.type';

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
    const message = yield call(saveUser, payload);

    toast({
      title: 'Success',
      description: message,
      variant: 'default',
    });

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

function* editUser({
  payload,
}: PayloadAction<UserEditInput & IdType>): Generator<
  CallEffect | PutEffect,
  void,
  string
> {
  try {
    const message = yield call(updateUser, payload);

    toast({
      title: 'Success',
      description: message,
      variant: 'default',
    });

    yield put(editUserSuccess());
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

    yield put(editUserFailed(errorMessage));
  }
}

function* deleteUser({
  payload,
}: PayloadAction<string>): Generator<CallEffect | PutEffect, void, string> {
  try {
    const message = yield call(removeUser, payload);

    toast({
      title: 'Success',
      description: message,
      variant: 'default',
    });

    yield put(deleteUserSuccess(payload));
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

function* watchEditUser(): Generator {
  yield takeLatest(editUserStart.type, editUser);
}

function* watchDeleteUser(): Generator {
  yield takeLatest(deleteUserStart.type, deleteUser);
}

export default function* userSaga(): Generator {
  yield all([
    call(watchGetUser),
    call(watchAddUser),
    call(watchDeleteUser),
    call(watchEditUser),
  ]);
}
