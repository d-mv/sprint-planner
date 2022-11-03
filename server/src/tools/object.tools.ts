import { RecordObject } from '../models';

export function makeMatch<T = unknown, K = T>(object: RecordObject<T>, defaultReturn: K) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) return target[prop.toString()];
      else return defaultReturn;
    },
  });
}

export function buildArray(length: number): number[] {
  const result: number[] = [];

  let i = 0;

  while (i < length) {
    result.push(i);
    i++;
  }
  return result;
}
