import { Dispatch, SetStateAction } from 'react';

export type UseIsCollapsedReturnType = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
];
