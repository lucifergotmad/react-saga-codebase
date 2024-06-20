import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { selectCurrentUser } from '@/data/auth/auth.selector';

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
