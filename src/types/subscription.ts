import { ObjectLiteral } from './support';

/**
 * A subscription is a class that holds the subscription's of state.
 */
export type SubscriptionProperties<S extends ObjectLiteral> = {
  /**
   * Function that publish a new state
   *
   * @param currentState - current store state
   * @param nextState - next store state
   */
  publish(currentState: S, nextState: S): void;

  /**
   * Function that subscribe to state changing
   *
   * @param callback - defines a callback function
   * @param config - configuration for callback function
   */
  subscribe<C extends S>(callback: C, config: C): boolean;
};
