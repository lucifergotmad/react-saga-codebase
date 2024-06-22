import { AuthEndpointType } from '@/modules/auth';

export const AUTH_ENDPOINTS: AuthEndpointType = {
  signIn: {
    url: 'auth/sign-in',
    method: 'POST',
  },
  signUp: {
    url: 'auth/sign-up',
    method: 'POST',
  },
};
