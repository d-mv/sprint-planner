import { assoc, path } from 'ramda';
import { randomUUID } from 'crypto';

import { ControllerRequest, RecordObject } from '../models';

function to<T>(data: unknown): T {
  return data as T;
}

export function buildRequest(query: RecordObject, collections: RecordObject, state: RecordObject = {}) {
  const get = (key: string) => path([key], state);

  const set = (key: string, value: string) => assoc(key, value, state);

  return to<ControllerRequest>({
    query,
    context: { collections, requestId: randomUUID(), state: { get, set } },
  });
}
