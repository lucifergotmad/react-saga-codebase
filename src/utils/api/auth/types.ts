import { UserLevel } from '@/shared/constants/user-level';

export type UserLoginResponse = {
  username: string;
  level: UserLevel;
  accessToken: string;
  refreshToken: string;
};
