import { createDynamicTransform } from '@/utils/helpers/transform';
import { AuthState } from './auth.type';
import { INITAL_STATE } from './auth.slice';

const authTransform = createDynamicTransform<AuthState>(
  ['currentUser'],
  INITAL_STATE,
  ['auth'],
);

export { authTransform };
