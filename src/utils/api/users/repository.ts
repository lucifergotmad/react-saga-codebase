import { PaginationType } from '@/shared/types/pagination.type';
import { GetUserResponse } from './types';
import { USER_ENDPOINTS } from './endpoint';
import request from '../base-repository';
import { IdType } from '@/shared/types/_id.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';

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

export const saveUser = async (data: UserAddInput): Promise<IdType> => {
  try {
    const response = await request<UserAddInput, IdType>({
      url: USER_ENDPOINTS.addUser,
      method: 'POST',
      data,
    });

    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
