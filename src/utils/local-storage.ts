import { StorageItemType } from '@/utils';

export const getLocalStorageItem = <T>(name: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(name);

      if (item !== null) {
        return JSON.parse(item) as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving item from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const setLocalStorageItem = <T>(name: string, data: T) => {
  if (typeof window !== 'undefined') {
    const item: StorageItemType<T> = {
      name,
      data,
    };
    localStorage.setItem(item.name, JSON.stringify(item.data));
  }
};

export const removeLocalStorageItem = (name: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(name);
  }
};
