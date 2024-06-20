import { getLocalStorageItem } from './local-storage';
import { getSessionStorageItem } from './session-storage';

export const getStorageItem = <T>(name: string, defaultValue: T): T => {
  let item = getLocalStorageItem<T>(name);
  if (item === null) {
    item = getSessionStorageItem<T>(name);
  }
  return item !== null ? item : defaultValue;
};
