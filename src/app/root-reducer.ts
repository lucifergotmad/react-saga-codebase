import { combineReducers } from 'redux';

import { routeReducer, themeReducer } from '@/app/data';
import { authReducer } from '@/modules/auth';
import { userReducer } from '@/modules/admin/users';

export const rootReducer = combineReducers({
  route: routeReducer,
  theme: themeReducer,
  auth: authReducer,
  user: userReducer,
});
