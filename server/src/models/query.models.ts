import { AnyValue, RecordObject } from '@mv-d/toolbelt';

export interface Query<Payload = AnyValue> {
  domain: string;
  action: string;
  payload?: Payload;
  meta?: RecordObject;
}
