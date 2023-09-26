/**
 * Platform's enum
 */
export enum Platform {
  BROWSER = 'browser',
  NODE = 'node',
}

/**
 * Object literal type
 */
export type ObjectLiteral = { [key: string]: unknown };

/**
 * Callback function type
 */
export type CallbackFunction<S extends ObjectLiteral> = {
  callback: (...args: S[]) => void;
  config: (...args: S[]) => S;
};
