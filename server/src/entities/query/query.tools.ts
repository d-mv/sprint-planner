import { AnyValue, PromisedServerResult, R, RecordObject, ServerResult } from '@mv-d/toolbelt';

import { ControllerRequest } from '../../models';

export function request(
  controller: RecordObject<
    RecordObject<(arg0: ControllerRequest) => ServerResult<AnyValue> | PromisedServerResult<AnyValue>>
  >,
  data: ControllerRequest,
) {
  const { query } = data;

  const fn = R.path([query.domain, query.action], controller);

  return fn(data);
}
