import { UserLevel } from '@/shared/constants/user-level';

export type UserData = {
  username: string;
  level: UserLevel;
  accessToken: string;
  refreshToken: string;
};

export type AuthState = {
  currentUser: UserData | null;
  isLoading: boolean;
  errorMessage: string | null;
};
