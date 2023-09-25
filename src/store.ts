import { StoreProperties } from './types/store';
import { ObjectLiteral } from './types/support';
import { clone, isObject } from './util/object';

/**
 * Implementation of store
 */
export class Store<S extends ObjectLiteral> implements StoreProperties<S> {
  /**
   * Internal value of store state
   */
  #internalState: S;

  constructor(readonly initialState: S = {} as S) {
    if (!isObject(initialState))
      throw new Error('Cannot assign non-object type to initial state');
    this.#internalState = initialState;
  }

  /**
   * Getter for current state
   */
  get state(): S {
    return clone(this.#internalState);
  }

  /**
   * Setter for state
   * @param value - new state value
   * @returns next state value
   */
  setState(value: S): S {
    if (!isObject(value)) throw new Error('State value must be a valid object');
    const currentState: S = clone(this.#internalState);
    const nextState: S = Object.assign(clone(currentState), clone(value));
    this.#internalState = nextState;
    return nextState;
  }
}
