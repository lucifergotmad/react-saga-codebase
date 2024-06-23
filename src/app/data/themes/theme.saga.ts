import {
  CallEffect,
  PutEffect,
  SelectEffect,
  all,
  call,
  put,
  select,
  takeEvery,
} from 'redux-saga/effects';

import { checkWidth, setCollapsed, selectIsCollapseSidebar } from '@/app/data';

function checkWindowWidth(isCollapsed: boolean) {
  return window.innerWidth < 768 ? false : isCollapsed;
}

function* handleResize(): Generator<
  CallEffect | PutEffect | SelectEffect,
  void,
  boolean
> {
  const isCollapsed = yield select(selectIsCollapseSidebar);
  const newIsCollapsed = yield call(checkWindowWidth, isCollapsed);
  yield put(setCollapsed(newIsCollapsed));
}

function* watchResize(): Generator {
  yield takeEvery(checkWidth.type, handleResize);
}

export function* themeSaga(): Generator {
  yield all([call(watchResize)]);
}
