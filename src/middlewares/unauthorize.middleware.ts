/* eslint-disable @typescript-eslint/ban-types */
import { Middleware, isAction } from '@reduxjs/toolkit';
import { signOut } from '@/data/auth/auth.slice';
import { RootState } from '@/config/root-state';
import { AppDispatch } from '@/config/store';

const unauthorizedMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isAction(action) && signOut.match(action)) {
      dispatch(signOut());
    }
    return next(action);
  };

export default unauthorizedMiddleware;
