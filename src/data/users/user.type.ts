import { UserData } from '@/data/auth/auth.type';
import { IdType } from '@/shared/types/_id.type';

export type UserList = UserData & IdType;

export type UserState = {
  userList: UserList[];
  isLoading: boolean;
  errorMessage: string | null;
};
