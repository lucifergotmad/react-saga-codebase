import { combineReducers } from 'redux';

import userReducer from '@/data/user.slice';

export const rootReducer = combineReducers({
  user: userReducer,
});
