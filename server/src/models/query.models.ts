import { AnyValue, RecordObject } from './general.models';

export interface Query<Payload = AnyValue> {
  domain: string;
  action: string;
  payload?: Payload;
  meta?: RecordObject;
}
