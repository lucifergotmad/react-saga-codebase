import { ReactNode } from 'react';
import { Navigate } from 'react-router';

type PrivateRoutesProps = {
  children: ReactNode;
};

export const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const isLogin = false;

  if (!isLogin) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return children;
  }
};
