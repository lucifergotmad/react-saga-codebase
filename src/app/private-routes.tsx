import { ReactNode } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '@/modules/auth';

type PrivateRoutesProps = {
  children: ReactNode;
};

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const isLogin = useSelector(selectCurrentUser);

  if (!isLogin) {
    return <Navigate to="/auth/sign-in" replace={true} />;
  } else {
    return <>{children}</>;
  }
};
