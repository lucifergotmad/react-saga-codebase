export type ErrorResponseType = {
  message: string;
};

export type ApiResponseType<T> = {
  data: T;
  message: string;
  count?: number;
};

export type DataTokenType = {
  accessToken: string;
  refreshToken: string;
};
