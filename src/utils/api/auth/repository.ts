import request from '@utils/api/base-repository';

import { USER_ENDPOINTS } from './endpoint';
import { UserLoginResponse } from './types';

export const login = async (data: any): Promise<UserLoginResponse> => {
  try {
    const response = await request<any, UserLoginResponse>({
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

export const register = async (data: any): Promise<string> => {
  try {
    const response = await request<any, string>({
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
