import { ObjectLiteral } from './support';

/**
 * A store is a class that holds the application's state tree.
 */
export type StoreProperties<S extends ObjectLiteral> = {
  /**
   * Getter for current state (public)
   *
   * @returns Current store state
   */
  get state(): S;

  /**
   * Setter for current state (public)
   *
   * @param value - new state value
   */
  set state(value: S);

  /**
   * Private setter function
   *
   * @param value - new state value
   * @returns new state
   */
  setState(value: S): S;

  /**
   * Subscriber for state
   *
   * @param callback - function callback
   * @param config - function config
   */
  subscribe<C extends S>(callback: C, config: C): boolean;
};
