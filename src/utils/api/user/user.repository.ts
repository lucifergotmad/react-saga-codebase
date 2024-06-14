import Repository from '@utils/api/base-repository';
import { USER_ENDPOINTS } from './user.endpoint';
import { TSignInInput } from '@/pages/auth/sign-in';

type UserData = {
  username: string;
};

export const login = async ({
  username,
  password,
}: TSignInInput): Promise<UserData> => {
  const response = await Repository.post<TSignInInput, UserData>(
    USER_ENDPOINTS.login,
    { username, password },
  );

  return response.data;
};
