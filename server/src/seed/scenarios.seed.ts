import colors from 'colors';
import serializeJavascript from 'serialize-javascript';

import {
  createSprintScenario,
  assignEngineerScenario,
  createEngineerScenario,
  assignWorkScenario,
  createWorkScenario,
} from '../data';
import { Scenario, ScenarioCollection } from '../entities';

export async function scenariosSeed() {
  const SCENARIOS: Scenario[] = [
    { label: 'createSprint', stringified: serializeJavascript(createSprintScenario, { isJSON: true }) },
    { label: 'assignEngineer', stringified: serializeJavascript(assignEngineerScenario, { isJSON: true }) },
    { label: 'createEngineer', stringified: serializeJavascript(createEngineerScenario, { isJSON: true }) },
    { label: 'assignWork', stringified: serializeJavascript(assignWorkScenario, { isJSON: true }) },
    { label: 'createWork', stringified: serializeJavascript(createWorkScenario, { isJSON: true }) },
  ];

  for await (const scenario of SCENARIOS) {
    // eslint-disable-next-line no-console
    console.log(colors.green(`Adding ${scenario.label} scenario...`));
    await ScenarioCollection.create(scenario);
  }
}
