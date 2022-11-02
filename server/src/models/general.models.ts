import { Mongoose } from 'mongoose';
import { SprintCollection } from '../entities';
import { STATE } from '../entities/state/state';
import { Query } from './query.models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any;

export type RecordObject<Values = unknown> = Record<string, Values>;

export interface Collections {
  sprint: typeof SprintCollection;
}

export interface ControllerRequest<QueryPayload = AnyValue> {
  query: Query<QueryPayload>;
  context: {
    requestId: string;
    db: Mongoose;
    collections: Collections;
    state: {
      get: (arg0: keyof typeof STATE) => typeof STATE[keyof typeof STATE];
      set: (arg0: keyof typeof STATE, arg1: AnyValue) => typeof STATE;
    };
  };
}
