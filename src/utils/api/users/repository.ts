import request from '../base-repository';
import { PaginationType } from '@/shared/types/pagination.type';
import { GetUserResponse } from './types';
import { USER_ENDPOINTS } from './endpoint';
import { IdType } from '@/shared/types/_id.type';
import { UserAddInput } from '@/pages/admin/user/components/user-add.form';
import { UserEditInput } from '@/pages/admin/user/components/user-edit.form';

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

export const saveUser = async (data: UserAddInput): Promise<string> => {
  try {
    const response = await request<UserAddInput, IdType>({
      url: USER_ENDPOINTS.addUser,
      method: 'POST',
      data,
    });

    return response.message;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const removeUser = async (_id: string): Promise<string> => {
  try {
    const response = await request<unknown, unknown>({
      url: `${USER_ENDPOINTS.addUser}/${_id}`,
      method: 'DELETE',
    });

    return response.message;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const updateUser = async ({
  _id,
  ...data
}: UserEditInput & IdType): Promise<string> => {
  try {
    const response = await request<UserEditInput, unknown>({
      url: `${USER_ENDPOINTS.addUser}/${_id}`,
      method: 'PUT',
      data,
    });

    return response.message;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
