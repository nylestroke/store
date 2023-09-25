import { Platform } from '../types/support';

/**
 * Function that check user platform (browser or node.js)
 */
export function getCurrentPlatform(): Platform {
  if (typeof window === 'undefined') return Platform.NODE;
  else return Platform.BROWSER;
}
