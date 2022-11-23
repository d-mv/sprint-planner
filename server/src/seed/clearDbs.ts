import { logger } from '@mv-d/toolbelt';
import {
  SprintCollection,
  EngineerCollection,
  WorkCollection,
  AssignedWorkCollection,
  AppCollection,
  ScenarioCollection,
} from '../entities';

export async function clearDbs() {
  logger.infoB('Clearing collections...');
  // clear dbs
  await SprintCollection.deleteMany();
  await EngineerCollection.deleteMany();
  await WorkCollection.deleteMany();
  await AssignedWorkCollection.deleteMany();
  await AppCollection.deleteMany();
  await ScenarioCollection.deleteMany();
}
