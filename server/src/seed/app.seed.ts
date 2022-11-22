import { CONFIG } from '../config';
import { AppCollection } from '../entities';

export async function appSeed(engineerIds?: string[]) {
  await AppCollection.create({
    assignedEngineers: engineerIds?.length ? engineerIds.slice(0, 5) : [],
    idleTimeS: CONFIG.idleTime,
  });
}
