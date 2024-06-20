import { UserLevel } from '@/shared/constants/user-level';

export type User = {
  username: string;
  level: UserLevel;
};

export type UserState = {
  userList: User[];
  isLoading: boolean;
  errorMessage: string | null;
};
