const ENCRYPT_KEY = import.meta.env.VITE_APP_ENCRYPT_KEY;

export const encryptASCII = (str: string): string => {
  const dataKey: { [key: number]: string } = {};

  for (let i = 0; i < ENCRYPT_KEY.length; i++) {
    dataKey[i] = ENCRYPT_KEY.substring(i, 1);
  }

  let strEnc = '';
  let nKey = 0;
  const jumlahStr = str.length;

  for (let i = 0; i < jumlahStr; i++) {
    strEnc += hexEncode(str[i].charCodeAt(0) + dataKey[nKey].charCodeAt(0));
    if (nKey === Object.keys(dataKey).length - 1) {
      nKey = 0;
    } else {
      nKey += 1;
    }
  }
  return strEnc.toUpperCase();
};

export const decryptASCII = (str: string): string | undefined => {
  if (str) {
    const dataKey: { [key: number]: string } = {};

    for (let i = 0; i < ENCRYPT_KEY.length; i++) {
      dataKey[i] = ENCRYPT_KEY.substring(i, 1);
    }

    let strDec = '';
    let nKey = 0;

    const jumlahStr = str.length;

    let i = 0;

    while (i < jumlahStr) {
      strDec += convertToString(
        hexDecode(str.substring(i, 2)) - dataKey[nKey].charCodeAt(0),
      );
      if (nKey === Object.keys(dataKey).length - 1) {
        nKey = 0;
      } else {
        nKey += 1;
      }
      i += 2;
    }
    return strDec;
  }
};

const hexEncode = (char: number): string => {
  return char.toString(16);
};

const hexDecode = (hex: string): number => {
  return parseInt(hex, 16);
};

const convertToString = (asci: number): string => {
  return String.fromCharCode(asci);
};

export const doEncrypt = (dataBeforeCopy: any, ignore: string[] = []): any => {
  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }

  if (typeof dataBeforeCopy === 'object' && !(dataBeforeCopy instanceof Date)) {
    const data = Array.isArray(dataBeforeCopy)
      ? [...dataBeforeCopy]
      : { ...dataBeforeCopy };
    Object.keys(data).forEach((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          data[x] = data[x].map((y: any) => {
            if (typeof y === 'string') {
              return encryptASCII(y);
            } else if (typeof y === 'object' && y && !(y instanceof Date)) {
              return doEncrypt(y, ignore);
            }
            return false;
          });
        } else {
          if (typeof data[x] === 'string' && data[x]) {
            data[x] = encryptASCII(data[x]);
          } else if (typeof data[x] === 'number' && data[x]) {
            // Call Masking Number
          } else if (
            typeof data[x] === 'object' &&
            data[x] &&
            !(dataBeforeCopy instanceof Date)
          ) {
            data[x] = doEncrypt(data[x], ignore);
          }
        }
      }
    });
    return data;
  } else if (typeof dataBeforeCopy === 'string') {
    return encryptASCII(dataBeforeCopy);
  }
};

export const doDecrypt = (dataBeforeCopy: any, ignore: string[] = []): any => {
  if (!dataBeforeCopy) {
    return dataBeforeCopy;
  }

  if (typeof dataBeforeCopy === 'object' && !(dataBeforeCopy instanceof Date)) {
    const data = Array.isArray(dataBeforeCopy)
      ? [...dataBeforeCopy]
      : { ...dataBeforeCopy };
    Object.keys(data).forEach((x) => {
      const result = ignore.find((find) => find === x);
      if (!result) {
        if (Array.isArray(data[x])) {
          data[x] = data[x].map((y: any) => {
            if (typeof y === 'string') {
              return decryptASCII(y);
            } else if (typeof y === 'object' && y && !(y instanceof Date)) {
              return doDecrypt(y, ignore);
            }
            return false;
          });
        } else {
          if (typeof data[x] === 'string' && data[x]) {
            data[x] = decryptASCII(data[x]);
          } else if (typeof data[x] === 'number' && data[x]) {
            // Call Unmasking Number()
          } else if (
            typeof data[x] === 'object' &&
            data[x] &&
            !(dataBeforeCopy instanceof Date)
          ) {
            data[x] = doDecrypt(data[x], ignore);
          }
        }
      }
    });
    return data;
  } else if (typeof dataBeforeCopy === 'string') {
    return decryptASCII(dataBeforeCopy);
  }
};
