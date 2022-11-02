import { RecordObject } from '../models';

export function makeMatch<T = unknown, K = T>(object: RecordObject<T>, defaultReturn: K) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) return target[prop.toString()];
      else return defaultReturn;
    },
  });
}
