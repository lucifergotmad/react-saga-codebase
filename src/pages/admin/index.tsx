import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/config/store';
import { Button } from 'flowbite-react';
import { signOutStart } from '@/data/auth/auth.slice';

const AdminDashboard: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onClickHandler = () => {
    dispatch(signOutStart());
  };

  return (
    <>
      <p className="mb-8">Admin Page!</p>
      <Button onClick={onClickHandler}>Log Out</Button>
    </>
  );
};

export default AdminDashboard;
