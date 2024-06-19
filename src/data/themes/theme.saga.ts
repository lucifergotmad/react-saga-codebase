import { PayloadAction } from '@reduxjs/toolkit';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { checkWidth, setCollapsed, setTheme } from './theme.slice';
import { all } from 'axios';

function updateThemeInDOM(theme: Theme) {
  console.log(window.document.documentElement.classList);
  window.document.documentElement.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    window.document.documentElement.classList.add(systemTheme);
  } else {
    window.document.documentElement.classList.add(theme);
  }
}

function checkWindowWidth() {
  return window.innerWidth < 768 ? false : true;
}

function* handleSetTheme({ payload }: PayloadAction<Theme>): Generator {
  console.log('hi');
  yield call(updateThemeInDOM, payload);
  yield put(setTheme(payload));
}

function* handleResize(): Generator<CallEffect | PutEffect, void, boolean> {
  const isCollapsed = yield call(checkWindowWidth);
  yield put(setCollapsed(isCollapsed));
}

function* watchSetTheme(): Generator {
  yield takeEvery(setTheme.type, handleSetTheme);
}

function* watchResize(): Generator {
  yield takeEvery(checkWidth.type, handleResize);
}

export default function* themeSaga(): Generator {
  yield all([call(watchSetTheme), call(watchResize)]);
}
