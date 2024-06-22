import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { ExtendedPersistConfig } from '@/app/type';
import { rootReducer } from '@/app/root-reducer';
import { rootSaga } from '@/app/root-saga';
import { unauthorizedMiddleware } from '@/app/middlewares';
import { authTransform } from '@/modules/auth';

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'auth'],
  transforms: [authTransform],
};

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
  unauthorizedMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

export { middlewares };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(middlewares),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
