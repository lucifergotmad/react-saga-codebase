import userSaga from '@/data/user.saga';
import { all, call } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([call(userSaga)]);
}
