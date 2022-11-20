import { RecordObject } from '../../models';

export type AddedEngineers = string[];

export interface App {
  addedEngineers: AddedEngineers;
  scenarios: RecordObject<string>;
}
