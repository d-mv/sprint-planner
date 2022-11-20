import { RecordObject } from '../../models';

export type AddedEngineers = string[];

export interface App {
  assignedEngineers: AddedEngineers;
  scenarios: RecordObject<string>;
}
