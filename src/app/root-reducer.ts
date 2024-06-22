import { combineReducers } from 'redux';

import { routeReducer, themeReducer } from '@/app/data';
import { authReducer } from '@/modules/auth';

export const rootReducer = combineReducers({
  route: routeReducer,
  theme: themeReducer,
  auth: authReducer,
});
