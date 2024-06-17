/* eslint-disable @typescript-eslint/ban-types */
import { Middleware, isAction } from '@reduxjs/toolkit';
import { signOutStart, isUnauthorized } from '@/data/auth/auth.slice';
import { RootState } from '@/config/root-state';
import { AppDispatch } from '@/config/store';

const unauthorizedMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isAction(action) && isUnauthorized.match(action)) {
      dispatch(signOutStart());
    }
    return next(action);
  };

export default unauthorizedMiddleware;
