import { combineReducers } from 'redux';

import authReducer from '@/data/auth/auth.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
});
