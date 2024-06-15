import request from '@utils/api/base-repository';
import { SignInInput } from '@/pages/auth/sign-in';

import { USER_ENDPOINTS } from './endpoint';
import { UserLoginResponse } from './types';

export const login = async (data: SignInInput): Promise<UserLoginResponse> => {
  const response = await request<SignInInput, UserLoginResponse>({
    url: USER_ENDPOINTS.login,
    method: 'POST',
    data,
  });

  return response.data;
};
