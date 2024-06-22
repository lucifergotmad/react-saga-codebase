import { UserData } from '@/modules/auth';
import { IdType } from '@/shared';

export type UserList = UserData & IdType;

export type UserState = {
  userList: UserList[];
  isLoading: boolean;
  errorMessage: string | null;
};
