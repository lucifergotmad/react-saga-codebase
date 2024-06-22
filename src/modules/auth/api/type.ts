import { UserLevel, EndPoint } from '@/shared';

export type UserLoginResponse = {
  fullname: string;
  email: string;
  username: string;
  level: UserLevel;
  accessToken: string;
  refreshToken: string;
};

type AuthEndpointKeys = 'signIn' | 'signUp';

export type AuthEndpointType = {
  [key in AuthEndpointKeys]: EndPoint;
};
