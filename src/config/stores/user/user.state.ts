import { UserLevel } from '@/shared/constants/user-level';

export type TUserData = {
  username: string;
  password: string;
  level: UserLevel;
};

export type UserState = {
  readonly currentUser: TUserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};
