import { all, call } from 'redux-saga/effects';

import { themeSaga } from '@/app/data';
import { authSaga } from '@/modules/auth';
import { userSaga } from '@/modules/admin/users';

export function* rootSaga() {
  yield all([call(themeSaga), call(authSaga), call(userSaga)]);
}
