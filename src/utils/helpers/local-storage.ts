import { doDecrypt, doEncrypt } from './encryptor';

interface ILocalStorageItem<T> {
  nama: string;
  data: T;
}

export const getItem = <T>(nama: string): T => {
  if (typeof window !== 'undefined') {
    const encryptedNama = doEncrypt(nama);
    const item = localStorage.getItem(encryptedNama);

    if (item !== null) {
      const decryptedData = doDecrypt(JSON.parse(item));
      return decryptedData as T;
    } else {
      return [] as T;
    }
  }
  return [] as T;
};

export const setItem = <T>(nama: string, data: T) => {
  if (typeof window !== 'undefined') {
    const item: ILocalStorageItem<T> = {
      nama: doEncrypt(nama),
      data: doEncrypt(data),
    };

    localStorage.setItem(item.nama, JSON.stringify(item.data));
  }
};

export const removeItem = (nama: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(doEncrypt(nama));
  }
};
