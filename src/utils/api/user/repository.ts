import Repository from '@utils/api/base-repository';
import { USER_ENDPOINTS } from './endpoint';
import { SignInInput } from '@/pages/auth/sign-in';

type UserData = {
  username: string;
};

export const login = async ({
  username,
  password,
}: SignInInput): Promise<UserData> => {
  const response = await Repository.post<SignInInput, UserData>(
    USER_ENDPOINTS.login,
    { username, password },
  );

  return response.data;
};
