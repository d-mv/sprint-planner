import { appSeed } from './app.seed';
import { clearDbs } from './clearDbs';
import { scenariosSeed } from './scenarios.seed';

export async function initSeed() {
  await clearDbs();
  await scenariosSeed();
  await appSeed();
}
