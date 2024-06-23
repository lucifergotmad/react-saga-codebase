import { getLocalStorageItem, getSessionStorageItem } from '@/utils';

export const getStorageItem = <T>(name: string, defaultValue: T): T => {
  let item = getLocalStorageItem<T>(name);
  if (item === null) {
    item = getSessionStorageItem<T>(name);
  }
  return item !== null ? item : defaultValue;
};
