import { AnyValue } from '../../models';

export type Some<Payload> = { isOK: true; payload: Payload };

export interface None {
  isOK: false;
  message: string;
}

export type Result<Payload = AnyValue> = Some<Payload> | None;

export type PromisedResult<Payload = AnyValue> = Promise<Result<Payload>>;
