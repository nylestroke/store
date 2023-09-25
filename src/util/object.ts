/**
 * Function that clone a state
 * @param state - state value to clone
 */
export const clone = <S>(state: S) => Object.assign({}, state);

/**
 * Function that check if state value is a valid object type
 * @param value - state value
 */
export const isObject = <V>(value: V) =>
  value != null && typeof value === 'object' && Array.isArray(value) === false;
