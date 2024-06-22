import CryptoJS from 'crypto-js';

export const generateSignature = (
  timestampApp: string,
  accessToken?: string,
) => {
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

  const signature = CryptoJS.SHA256(
    APP_KEY + SECRET_KEY + accessToken + timestampApp,
  ).toString();

  return signature;
};
