import { LocalStore, Store } from './types/store';
import { getUserPlatform } from './support';
import { Platform } from './types/support';

/**
 * Function that update's store state in local storage if platform is browser
 */
function updateStoreState<S>(state: S): void {
  // Check if user platform is browser
  if (getUserPlatform() === Platform.BROWSER) {
    window.localStorage.setItem('store', JSON.stringify(state));
  }
}

/**
 * A store management function
 */
export function createStore<S extends Record<string, unknown>>(
  initialState: S,
): Store<S> {
  const store: S = initialState;
  const storeObject: LocalStore<typeof store> = {
    data: [JSON.parse(JSON.stringify(store))],
  };
  // Update data in local storage if platform is browser
  updateStoreState(storeObject);
  // Implement functions
  return {
    get<K extends keyof S>(key: K): S[K] {
      // Check if value exists in storeObject
      const exists: boolean = storeObject.data[0][key] != null;
      if (!exists) {
        throw new Error(
          `Value for provided key (${JSON.stringify(key)}) does not present`,
        );
      }
      // Get value from a store object
      return store[key];
    },
    set<K extends keyof S>(key: K, cb: (current: S[K]) => S[K]): void {
      // Set new value to element in store object
      const value: S[K] = cb(store[key]);
      store[key] = cb(value);
      // Update value in a local storage
      storeObject.data[0][key] = value;
      updateStoreState(storeObject);
    },
    clear(): void {
      // Delete elements from store object
      Object.keys(store).map((key: string): void => {
        // Work-around from type-safety issues
        const nullObj = { [key]: null };
        Object.assign(store, nullObj);
      });
      // Clear a local storage
      storeObject.data = [store];
      updateStoreState(storeObject);
    },
    empty<K extends keyof S>(key: K): void {
      // Change value in store object
      Object.keys(store).map((index: string): void => {
        // Work-around from type-safety issues
        if (index === key) {
          const nullObj = { [key]: null };
          Object.assign(store, nullObj);
        }
      });
    },
    delete<K extends keyof S>(key: K): void {
      // Delete element from store object
      delete store[key];
      // Delete element from a local storage
      delete storeObject.data[0][key];
      updateStoreState(storeObject);
    },
    object(): S {
      // Return current store state
      return storeObject.data[0];
    },
  };
}
