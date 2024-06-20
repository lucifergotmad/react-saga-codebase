import { all, call } from 'redux-saga/effects';

import authSaga from '@/data/auth/auth.saga';
import themeSaga from '@/data/themes/theme.saga';
import userSaga from '@/data/users/user.saga';

export function* rootSaga() {
  yield all([call(authSaga), call(themeSaga), call(userSaga)]);
}
