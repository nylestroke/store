import { CallbackFunction, ObjectLiteral } from './types/support';
import { SubscriptionProperties } from './types/subscription';
import { isEqual, isObject } from './util/object';

export class Subscription<S extends ObjectLiteral>
  implements SubscriptionProperties<S>
{
  #callbackList: CallbackFunction<S>[];

  constructor() {
    this.#callbackList = [];
  }

  publish(currentState: S, nextState: S): void {
    if (!isObject(currentState))
      throw new Error('Current state must be an valid object');
    if (!isObject(nextState))
      throw new Error('Next state must be an valid object');
    this.#callbackList.forEach((item: CallbackFunction<S>): void => {
      const currentValue = item.config(currentState);
      const nextValue = item.config(nextState);
      if (!isEqual(currentValue, nextValue)) {
        item.callback(nextValue);
      }
    });
  }

  subscribe<C extends S>(callback: C, config: C): boolean {
    if (typeof callback !== 'function')
      throw new Error('Callback should be a function');
    if (typeof config !== 'function')
      throw new Error('Config should be a function');
    this.#callbackList = [...this.#callbackList, { callback, config }];
    return true;
  }
}
