import { UserLevel } from '@/shared/constants/user-level';

export type GetUserResponse = {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  level: UserLevel;
};
