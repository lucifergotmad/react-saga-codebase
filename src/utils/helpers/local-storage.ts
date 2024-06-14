import { doDecrypt, doEncrypt } from './encryptor';

interface ILocalStorageItem<T> {
  name: string;
  data: T;
}

export const getItem = <T>(name: string): T => {
  if (typeof window !== 'undefined') {
    const encryptedName = doEncrypt(name);
    const item = localStorage.getItem(encryptedName);

    if (item !== null) {
      const decryptedData = doDecrypt(JSON.parse(item));
      return decryptedData as T;
    } else {
      return [] as T;
    }
  }
  return [] as T;
};

export const setItem = <T>(name: string, data: T) => {
  if (typeof window !== 'undefined') {
    const item: ILocalStorageItem<T> = {
      name: doEncrypt(name),
      data: doEncrypt(data),
    };

    localStorage.setItem(item.name, JSON.stringify(item.data));
  }
};

export const removeItem = (name: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(doEncrypt(name));
  }
};
