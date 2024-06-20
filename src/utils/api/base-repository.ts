import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { generateSignature } from '@utils/helpers/signature';
import { getStorageItem } from '../helpers/storage';
import { store } from '@/config/store';
import { isUnauthorized } from '@/data/auth/auth.slice';

interface IErrorResponse {
  message: string;
}

export interface IAPIResponse<T> {
  data: T;
  message: string;
  count?: number;
}

type DataToken = {
  accessToken: string;
  refreshToken: string;
};

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const getConfig = (
  params?: Record<string, number | string | boolean | undefined>,
): AxiosRequestConfig => {
  const userData: DataToken | null = getStorageItem<DataToken>('token', {
    accessToken: '',
    refreshToken: '',
  });
  const accessToken = userData?.accessToken ?? '';
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
): Promise<IAPIResponse<R>> => {
  const config = getConfig(options.params);

  return client({ ...options, ...config })
    .then((response: AxiosResponse) => response.data)
    .catch((error: AxiosError<IErrorResponse>) => {
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

export default request;
