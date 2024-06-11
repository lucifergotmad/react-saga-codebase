import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { generateSignature } from '@utils/helpers/signature';

interface IAPIResponse<T> {
  data: T;
  message: number;
  count?: number;
}

class BaseRepository {
  protected http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: '/',
    });
  }

  private getConfig(
    params?: Record<string, number | string | boolean | undefined>,
  ): AxiosRequestConfig {
    const timestamp = new Date().toISOString();
    const signature = generateSignature(timestamp);

    const config: AxiosRequestConfig = {
      headers: {
        timestamp: timestamp,
        signature: signature,
        Accept: 'application/json',
        Authorization: 'Bearer Token',
      },
      params: params,
    };

    return config;
  }

  async get<T>(
    endpoint: string,
    params?: Record<string, number | string | boolean | undefined>,
  ): Promise<IAPIResponse<T>> {
    try {
      const config = this.getConfig(params);
      const response = await this.http.get(endpoint, config);
      console.log(`GET ${endpoint} berhasil!`);
      return response.data;
    } catch (error) {
      console.error(`Kesalahan dalam GET ${endpoint}: ${error}`);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: T): Promise<IAPIResponse<T>> {
    try {
      const response = await this.http.post(endpoint, data);
      console.log(`POST ${endpoint} berhasil`);
      return response.data;
    } catch (error) {
      console.error(`Kesalahan dalam POST ${endpoint}: ${error}`);
      throw error;
    }
  }
}

export default BaseRepository;
