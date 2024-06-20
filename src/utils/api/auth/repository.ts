import request from '@utils/api/base-repository';

import { USER_ENDPOINTS } from './endpoint';
import { UserLoginResponse } from './types';
import { SignInInput } from '@/pages/auth/sign-in/components/sign-in.form';
import { SignUpInput } from '@/pages/auth/sign-up/components/sign-up.form';

export const login = async (data: SignInInput): Promise<UserLoginResponse> => {
  try {
    const response = await request<SignInInput, UserLoginResponse>({
      url: USER_ENDPOINTS.signIn,
      method: 'POST',
      data,
    });

    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const register = async (data: SignUpInput): Promise<string> => {
  try {
    const response = await request<SignUpInput, string>({
      url: USER_ENDPOINTS.signUp,
      method: 'POST',
      data,
    });

    return response.message;
  } catch (error) {
    console.error('API request failed: ', error);
    throw error;
  }
};
