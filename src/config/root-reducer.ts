import { combineReducers } from 'redux';

import authReducer from '@/data/auth/auth.slice';
import navigationReducer from '@/data/routes/navigation.slice';
import themeReducer from '@/data/themes/theme.slice';
import userReducer from '@/data/users/user.slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  navigation: navigationReducer,
  theme: themeReducer,
  user: userReducer,
});
