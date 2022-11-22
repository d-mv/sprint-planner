import { AnyValue } from '@mv-d/toolbelt';

export function checkQuery(body: AnyValue) {
  const isConnectRequest = body.domain === 'auth' && body.action === 'connect';

  const isDisConnectRequest = body.domain === 'auth' && body.action === 'disconnect';

  const isIdleTimeUpdateRequest = body.domain === 'app' && body.action === 'updateIdleTimes';

  return { isConnectRequest, isDisConnectRequest, isIdleTimeUpdateRequest };
}
