import { combineReducers } from 'redux';

import authReducer from '@/data/auth/auth.slice';
import navigationReducer from '@/data/navigation/navigation.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
});
