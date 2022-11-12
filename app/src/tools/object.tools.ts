import { RecordObject } from '../models';

export function makeMatch<T = unknown, K = T>(object: RecordObject<T>, defaultReturn: K) {
  return new Proxy(object, {
    get(target, prop) {
      if (prop in target) return target[prop.toString()];
      else return defaultReturn;
    },
  });
}

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
