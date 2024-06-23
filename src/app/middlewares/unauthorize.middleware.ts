/* eslint-disable @typescript-eslint/ban-types */
import { Middleware, isAction } from '@reduxjs/toolkit';

import { RootState } from '@/app/root-state';
import { AppDispatch } from '@/app/store';
import { isUnauthorized, signOutStart } from '@/modules/auth';

const unauthorizedMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isAction(action) && isUnauthorized.match(action)) {
      dispatch(signOutStart());
    }
    return next(action);
  };

export { unauthorizedMiddleware };
