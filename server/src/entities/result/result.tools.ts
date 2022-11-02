import { None, Some } from './result.models';

export function success<Payload>(payload: Payload): Some<Payload> {
  return { isOK: true, payload };
}

export function failure(message: string, code: number): None {
  return { isOK: false, message, code };
}
