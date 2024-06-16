import { ReactNode } from 'react';
import { Navigate } from 'react-router';

type PrivateRoutesProps = {
  children: ReactNode;
};

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const isLogin = true;

  if (!isLogin) {
    return <Navigate to="/auth/sign-in" replace={true} />;
  } else {
    return children;
  }
};
