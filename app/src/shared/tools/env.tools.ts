import { hasPath, path } from 'ramda';

import { ERRORS } from '../data';
import { fromTemplate } from './text.tools';

type EnvReturn = { value: string | undefined; expect: (message?: string) => string };

/**
 * Helper function to extract environment variables from 'process.env'
 * @param key
 * @returns string
 *
 * @example
 * ```typescript
 * env('SERVER_URL').value // undefined or 'http://....'
 * env('SERVER_URL').expect('SERVER_URL is missing') // throws error, if missing or returns 'http://....'
 * ```
 */
export function env(key: string): EnvReturn {
  function expect(message?: string) {
    // if no key
    if (!hasPath([key], process.env)) throw new Error(message ?? fromTemplate(ERRORS.missingEnv, [key]));

    const value = String(path([key], process.env));

    if (!value.trim()) throw new Error(message ?? fromTemplate(ERRORS.emptyEnv, [key]));

    return value.trim();
  }

  return { expect, value: path([key], process.env) };
}
