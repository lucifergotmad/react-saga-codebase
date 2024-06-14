import Repository from '@utils/api/base-repository';
import { USER_ENDPOINTS } from './user.endpoint';
import { TSignInInput } from '@/pages/auth/sign-in';
import { TUserData } from '@/config/stores/user/user.state';

export const login = async ({
  username,
  password,
}: TSignInInput): Promise<TUserData> => {
  const response = await Repository.post<TSignInInput, TUserData>(
    USER_ENDPOINTS.login,
    { username, password },
  );

  return response.data;
};
