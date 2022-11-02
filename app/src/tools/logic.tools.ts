import { AnyValue } from '../models';

export function isFn(data: AnyValue): boolean {
  return typeof data === 'function';
}

export function ifTrue<T = unknown>(condition: AnyValue, dataOrFn: (() => T) | T): T | undefined;

export function ifTrue<T = unknown, K = T>(
  condition: AnyValue,
  dataOrFn: (() => T) | T,

  alternative?: (() => K) | K,
): T | K;

// overload is above
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ifTrue<T = unknown, K = T>(condition: AnyValue, dataOrFn: (() => T) | T, alternative?: (() => K) | K) {
  if (condition) {
    if (isFn(dataOrFn)) return (dataOrFn as () => T)();

    return dataOrFn as T;
  }

  if (alternative) {
    if (isFn(alternative)) return (alternative as () => K)();

    return alternative as K;
  }

  return undefined;
}
