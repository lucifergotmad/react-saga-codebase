import { UserLevel } from '@/shared/constants/user-level';

export type UserLoginResponse = {
  fullname: string;
  email: string;
  username: string;
  level: UserLevel;
  accessToken: string;
  refreshToken: string;
};
