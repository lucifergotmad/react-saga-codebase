import {
  AUTH_ENDPOINTS,
  SignInInput,
  SignUpInput,
  UserLoginResponse,
} from '@/modules/auth';
import { request } from '@/utils';

export const login = async (data: SignInInput): Promise<UserLoginResponse> => {
  try {
    const response = await request<SignInInput, UserLoginResponse>({
      url: AUTH_ENDPOINTS.signIn.url,
      method: AUTH_ENDPOINTS.signIn.method,
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
      url: AUTH_ENDPOINTS.signUp.url,
      method: AUTH_ENDPOINTS.signUp.method,
      data,
    });

    return response.message;
  } catch (error) {
    console.error('API request failed: ', error);
    throw error;
  }
};
