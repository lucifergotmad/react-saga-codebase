import { PaginationType, IdType } from '@/shared';
import {
  GetUserResponse,
  USER_ENDPOINTS,
  UserAddInput,
  UserEditInput,
} from '@/modules/admin/users';
import { request } from '@/utils';

export const findUsers = async (
  data: PaginationType,
): Promise<GetUserResponse[]> => {
  try {
    const response = await request<PaginationType, GetUserResponse[]>({
      url: USER_ENDPOINTS.getUser.url,
      method: USER_ENDPOINTS.getUser.method,
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
      url: USER_ENDPOINTS.addUser.url,
      method: USER_ENDPOINTS.addUser.method,
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
      url: `${USER_ENDPOINTS.deleteUser.url}/${_id}`,
      method: USER_ENDPOINTS.deleteUser.method,
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
      url: `${USER_ENDPOINTS.editUser.url}/${_id}`,
      method: USER_ENDPOINTS.editUser.method,
      data,
    });

    return response.message;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
