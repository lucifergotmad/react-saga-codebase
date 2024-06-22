import { EndPoint, UserLevel } from '@/shared';

export type GetUserResponse = {
  _id: string;
  fullname: string;
  email: string;
  username: string;
  level: UserLevel;
};

type UserEndPointKeys = 'getUser' | 'addUser' | 'editUser' | 'deleteUser';

export type UserEndPointType = {
  [key in UserEndPointKeys]: EndPoint;
};
