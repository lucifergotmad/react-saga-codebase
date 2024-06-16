import { getLocalStorageItem } from './local-storage';
import { getSessionStorageItem } from './session-storage';

export const getStorageItem = <T>(name: string, defaultValue: T): T | null => {
  let item = getLocalStorageItem<T>(name, defaultValue);
  if (item === defaultValue) {
    item = getSessionStorageItem<T>(name, defaultValue);
  }
  return item;
};
