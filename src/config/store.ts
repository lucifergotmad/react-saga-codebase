import { Middleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import type { PersistConfig } from 'redux-persist';

import { rootSaga } from '@/config/root-saga';
import { rootReducer } from '@/config/root-reducer';
import { RootState } from '@/config/root-state';
import { authTransform } from '@/data/auth/auth.transform';

import unauthorizedMiddleware from '@/middlewares/unauthorize.middleware';

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

export const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'],
  transforms: [authTransform],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares: Middleware[] = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
  unauthorizedMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

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
