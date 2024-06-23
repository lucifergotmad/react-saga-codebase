import { PersistConfig } from 'redux-persist';

import { RootState } from '@/app/root-state';

export type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};
