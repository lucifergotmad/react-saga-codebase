import { PaginationType } from '@/shared/types/pagination.type';
import { GetUserResponse } from './types';
import { USER_ENDPOINTS } from './endpoint';
import request from '../base-repository';

export const findUsers = async (
  data: PaginationType,
): Promise<GetUserResponse[]> => {
  try {
    const response = await request<PaginationType, GetUserResponse[]>({
      url: USER_ENDPOINTS.getUsers,
      method: 'GET',
      params: data,
    });

    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
