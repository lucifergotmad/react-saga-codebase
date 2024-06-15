import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { generateSignature } from '@utils/helpers/signature';

interface IAPIResponse<T> {
  data: T;
  message: number;
  count?: number;
}

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const getConfig = (
  params?: Record<string, number | string | boolean | undefined>,
): AxiosRequestConfig => {
  const accessToken = '';
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
    .catch((error: AxiosError) => {
      throw error;
    });
};

export default request;
