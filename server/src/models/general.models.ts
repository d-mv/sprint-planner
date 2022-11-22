import { AnyValue } from '@mv-d/toolbelt';
import { Mongoose } from 'mongoose';

import {
  AppCollection,
  AssignedWorkCollection,
  EngineerCollection,
  SprintCollection,
  WorkCollection,
  ScenarioCollection,
} from '../entities';
import { Query } from './query.models';

export interface Collections {
  sprint: typeof SprintCollection;
  engineer: typeof EngineerCollection;
  work: typeof WorkCollection;
  assignedWork: typeof AssignedWorkCollection;
  app: typeof AppCollection;
  scenario: typeof ScenarioCollection;
}

export interface ControllerRequest<QueryPayload = AnyValue> {
  query: Query<QueryPayload>;
  context: {
    requestId: string;
    db: Mongoose;
    collections: Collections;
  };
}
