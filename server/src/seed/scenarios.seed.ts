import { logger, serializeJavascript } from '@mv-d/toolbelt';

import {
  createSprintScenario,
  assignEngineerScenario,
  createEngineerScenario,
  assignWorkScenario,
  createWorkScenario,
  engineerDaysOffScenario,
} from '../data';
import { Scenario, ScenarioCollection } from '../entities';

export async function scenariosSeed() {
  const SCENARIOS: Scenario[] = [
    { label: 'createSprint', stringified: serializeJavascript(createSprintScenario, { isJSON: true }) },
    { label: 'assignEngineer', stringified: serializeJavascript(assignEngineerScenario, { isJSON: true }) },
    { label: 'createEngineer', stringified: serializeJavascript(createEngineerScenario, { isJSON: true }) },
    { label: 'assignWork', stringified: serializeJavascript(assignWorkScenario, { isJSON: true }) },
    { label: 'createWork', stringified: serializeJavascript(createWorkScenario, { isJSON: true }) },
    { label: 'engineerDaysOff', stringified: serializeJavascript(engineerDaysOffScenario, { isJSON: true }) },
  ];

  for await (const scenario of SCENARIOS) {
    logger.info(`Adding ${scenario.label} scenario...`);
    await ScenarioCollection.create(scenario);
  }
}
