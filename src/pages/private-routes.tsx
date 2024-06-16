import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { RootState } from '@/config/root-state';

type PrivateRoutesProps = {
  children: ReactNode;
};

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const isLogin = useSelector((state: RootState) => state.auth.currentUser);

  if (!isLogin) {
    return <Navigate to="/auth/sign-in" replace={true} />;
  } else {
    return <>{children}</>;
  }
};
