import { createTransform } from 'redux-persist';

const createDynamicTransform = <T extends object>(
  persistedProps: (keyof T)[],
  defaultValues: Partial<T>,
  whitelist: string[],
) => {
  return createTransform<T, Partial<T>>(
    (inboundState: T): Partial<T> => {
      const stateToPersist: Partial<T> = {};
      persistedProps.forEach((prop) => {
        if (prop in inboundState) {
          stateToPersist[prop] = inboundState[prop];
        }
      });
      return stateToPersist;
    },
    (outboundState: Partial<T>): T => {
      return { ...defaultValues, ...outboundState } as T;
    },
    { whitelist },
  );
};

export { createDynamicTransform };
