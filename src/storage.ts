import { getCurrentPlatform } from "./util/platform";
import { Platform } from "./types/support";

/**
 * A storage is a manipulation service for local storage
 */
export class Storage {

  private static isPlatformNode(): boolean {
    return getCurrentPlatform() === Platform.NODE;
  }

  /**
   * Set's value to storage
   *
   * @param key - local storage key
   * @param value - local storage value
   */
  static setStorageValue<T>(key: string, value: T): void {
    if (this.isPlatformNode()) return;

    const old = localStorage[key];
    localStorage[key] = JSON.stringify(value);
    this.fireUpdate(key, localStorage[key], old);
  }

  /**
   * Remove value from storage
   *
   * @param key - - local storage key
   */
  static clearStorageValue(key: string): void {
    if (this.isPlatformNode()) return;

    const old = localStorage[key];
    delete localStorage[key];
    this.fireUpdate(key, undefined, old);
  }

  /**
   * Immediately update data in storage
   *
   * @param key - - local storage key
   * @param newValue - new value
   * @param oldValue - old value
   * @private
   */
  private static fireUpdate(key: string, newValue: any, oldValue: any) { // eslint-disable-line
    if (this.isPlatformNode()) return;

    // eslint-disable-line
    const event: StorageEvent = new StorageEvent('storage', {
      key,
      oldValue,
      newValue,
      storageArea: localStorage,
    });
    window.dispatchEvent(event);
  }

  /**
   * Return's value by key from storage
   *
   * @param key - local storage key
   * @param defaultValue - set's default if key not found
   */
  static getStorageValue<T>(key: string, defaultValue?: never): T | undefined;
  static getStorageValue<T>(key: string, defaultValue: T): T;
  static getStorageValue<T>(key: string, defaultValue?: T): T | undefined {
    if (this.isPlatformNode()) return;

    try {
      return JSON.parse(localStorage[key]);
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * Set's a value buy key to storage
   *
   * @param key - local storage key
   * @param defaultValue - set's default if key not found
   */
  static subscribeStorageValue<T>(
    key: string,
    defaultValue?: never,
  ): Promise<T | undefined>;
  static subscribeStorageValue<T>(key: string, defaultValue: T): Promise<T>;
  static subscribeStorageValue<T>(
    key: string,
    defaultValue?: T,
  ): Promise<T | undefined> {
    if (this.isPlatformNode()) return Promise.resolve(undefined);

    return new Promise<T>(callback => {
      callback(this.getStorageValue<T>(key, defaultValue!));
      const handler = (event: StorageEvent) => {
        if (event.storageArea !== localStorage || event.key != key) return;
        callback(this.getStorageValue<T>(key, defaultValue!));
      };

      window.addEventListener('storage', handler);
      return {
        unsubscribe: () => window.removeEventListener('storage', handler),
      };
    });
  }
}
