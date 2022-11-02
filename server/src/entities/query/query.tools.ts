import { path } from 'ramda';

import { RecordObject, ControllerRequest } from '../../models';
import { Result, PromisedResult } from '../result';

export function request(
  controller: RecordObject<RecordObject<(arg0: ControllerRequest) => Result | PromisedResult>>,
  data: ControllerRequest,
) {
  const { query } = data;

  const fn = path([query.domain, query.action], controller);

  return fn(data);
}
