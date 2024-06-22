import { UserLevel } from '@/shared';

export type UserData = {
  fullname: string;
  username: string;
  email: string;
  level: UserLevel;
};

export type AuthState = {
  currentUser: UserData | null;
  isLoading: boolean;
  errorMessage: string | null;
};
