import { RecordObject } from '@mv-d/toolbelt';

export function sortScenarioKeys<Scenario>(obj: unknown): Scenario {
  if (!obj || typeof obj !== 'object') return obj as Scenario;

  const scenario = obj as RecordObject<{ order: number }>;

  const sorted = Object.keys(scenario)
    .sort((a: string, b: string) => scenario[a].order - scenario[b].order)
    .reduce((acc, key) => {
      return { ...acc, [key]: (obj as RecordObject)[key] };
    }, {});

  return sorted as Scenario;
}
