/**
 *  A store is an object that holds the application's state tree.
 */
export interface Store<S> {
    /**
     * Getter for store object
     * @param key
     */
    get<K extends keyof S>(key: K): S[K];

    /**
     * Setter for store object
     * @param key
     * @param cb
     */
    set<K extends keyof S>(key: K, cb: (current: S[K]) => S[K]): void;

    /**
     * Delete store object by key
     * @param key
     */
    delete<K extends keyof S>(key: K): void;

    /**
     * Completely clear a store
     */
    clear(): void;

    /**
     * Make current value empty
     */
    empty<K extends keyof S>(key: K): void;

    /**
     * Pack and return current state of store
     */
    object(): S;
}

/**
 * Type for store local storage object
 */
export type LocalStore<S> = {
    data: [S]
};