export const getSessionStorageItem = <T>(name: string): T | null => {
  if (typeof window !== 'undefined') {
    try {
      const item = sessionStorage.getItem(name);
      if (item !== null) {
        return JSON.parse(item) as T;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving item from sessionStorage:', error);
      return null;
    }
  }
  return null;
};

export const setSessionStorageItem = <T>(name: string, data: T) => {
  if (typeof window !== 'undefined') {
    const item: IStorageItem<T> = {
      name,
      data,
    };

    sessionStorage.setItem(item.name, JSON.stringify(item.data));
  }
};

export const removeSessionStorageItem = (name: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(name);
  }
};
