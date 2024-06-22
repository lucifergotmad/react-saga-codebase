import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { store } from '@/app/store';
import { isUnauthorized } from '@/modules/auth';
import {
  ApiResponseType,
  DataTokenType,
  ErrorResponseType,
  generateSignature,
  getStorageItem,
} from '@/utils';

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const getConfig = (
  params?: Record<string, number | string | boolean | undefined>,
): AxiosRequestConfig => {
  const userData: DataTokenType = getStorageItem<DataTokenType>('token', {
    accessToken: '',
    refreshToken: '',
  });
  const accessToken = userData.accessToken;
  const timestamp = new Date().toISOString();
  const signature = generateSignature(timestamp, accessToken);

  const config: AxiosRequestConfig = {
    headers: {
      timestamp: timestamp,
      signature: signature,
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: params,
  };

  return config;
};

const request = async <T, R>(
  options: AxiosRequestConfig<T>,
): Promise<ApiResponseType<R>> => {
  const config = getConfig(options.params);

  return client({ ...options, ...config })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError<ErrorResponseType>) => {
      if (error.response?.status === 401) {
        store.dispatch(isUnauthorized());
      }
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unknown error occurred';

      throw new Error(errorMessage);
    });
};

export { request };
