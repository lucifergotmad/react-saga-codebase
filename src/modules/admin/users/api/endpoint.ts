import { UserEndPointType } from './type';

export const USER_ENDPOINTS: UserEndPointType = {
  getUser: {
    url: 'users',
    method: 'GET',
  },
  addUser: {
    url: 'users',
    method: 'POST',
  },
  deleteUser: {
    url: 'users',
    method: 'DELETE',
  },
  editUser: {
    url: 'users',
    method: 'PUT',
  },
};
