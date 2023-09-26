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
   * Private setter function
   *
   * @param value - new state value
   * @returns new state
   */
  setState(value: S): S;

  /**
   * Function that clear's the current store state
   */
  clearState(): void;

  /**
   * Remove the value from state
   *
   * @param value - some state value
   */
  cutState<V extends keyof S>(value: V): void;

  /**
   * Subscriber for state
   *
   * @param callback - function callback
   * @param config - function config
   */
  subscribe<C extends S>(callback: C, config: C): boolean;
};
