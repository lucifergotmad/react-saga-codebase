import { AuthState, INITAL_STATE } from '@/modules/auth';
import { createDynamicTransform } from '@/utils';

const authTransform = createDynamicTransform<AuthState>(
  ['currentUser'],
  INITAL_STATE,
  ['auth'],
);

export { authTransform };
