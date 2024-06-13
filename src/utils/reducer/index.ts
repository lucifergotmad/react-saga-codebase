import { Action, UnknownAction } from 'redux';
import { ActionWithPayload, Matchable } from './type';

export function withMatcher<AC extends (...args: any[]) => UnknownAction>(
  actionCreator: AC,
): Matchable<AC> {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: UnknownAction): action is ReturnType<AC> {
      return action.type === type;
    },
  });
}

export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>;

export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload !== undefined ? { type, payload } : { type };
}
