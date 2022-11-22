import { R, colorette, logger } from '@mv-d/toolbelt';
import {
  SprintCollection,
  EngineerCollection,
  WorkCollection,
  AssignedWorkCollection,
  AppCollection,
  ScenarioCollection,
} from '../entities';

export async function clearDbs() {
  R.compose(logger.info, colorette.blue)('Clearing collections...');
  // clear dbs
  await SprintCollection.deleteMany();
  await EngineerCollection.deleteMany();
  await WorkCollection.deleteMany();
  await AssignedWorkCollection.deleteMany();
  await AppCollection.deleteMany();
  await ScenarioCollection.deleteMany();
}
