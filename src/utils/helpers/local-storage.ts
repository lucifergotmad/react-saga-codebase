import { doDecrypt, doEncrypt } from './encryptor';

export const getLocalStorageItem = <T>(name: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    try {
      const encryptedName = doEncrypt(name);
      const item = localStorage.getItem(encryptedName);

      if (item !== null) {
        const decryptedData = doDecrypt(JSON.parse(item));
        return decryptedData as T;
      } else {
        return defaultValue;
      }
    } catch (error) {
      console.error('Error retrieving item from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};

export const setLocalStorageItem = <T>(name: string, data: T) => {
  if (typeof window !== 'undefined') {
    const item: IStorageItem<T> = {
      name: doEncrypt(name),
      data: doEncrypt(data),
    };

    localStorage.setItem(item.name, JSON.stringify(item.data));
  }
};

export const removeLocalStorageItem = (name: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(doEncrypt(name));
  }
};
