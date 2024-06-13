import { UnknownAction } from 'redux';

export type Matchable<AC extends (...args: any[]) => UnknownAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: UnknownAction): action is ReturnType<AC>;
};

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};
