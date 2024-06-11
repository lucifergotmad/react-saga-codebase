import CryptoJS from 'crypto-js';

export const generateSignature = (timestampApp: string) => {
  const signature = CryptoJS.SHA256(
    'VITE_APP_KEY' + 'VITE_APP_SECRETKEY' + 'access_token' + timestampApp,
  ).toString();

  return signature;
};
