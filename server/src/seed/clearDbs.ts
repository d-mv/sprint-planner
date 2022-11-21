import colors from 'colors';

import {
  SprintCollection,
  EngineerCollection,
  WorkCollection,
  AssignedWorkCollection,
  AppCollection,
  ScenarioCollection,
} from '../entities';

export async function clearDbs() {
  // eslint-disable-next-line no-console
  console.log(colors.blue('Clearing collections...'));
  // clear dbs
  await SprintCollection.deleteMany();
  await EngineerCollection.deleteMany();
  await WorkCollection.deleteMany();
  await AssignedWorkCollection.deleteMany();
  await AppCollection.deleteMany();
  await ScenarioCollection.deleteMany();
}
