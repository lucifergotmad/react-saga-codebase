import { all, call } from 'redux-saga/effects';

import { themeSaga } from '@/app/data';
import { authSaga } from '@/modules/auth';

export function* rootSaga() {
  yield all([call(themeSaga), call(authSaga)]);
}
