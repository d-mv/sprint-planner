import { FormItem, FormScenario, FormSection, SectionFormItem } from './models';

export function validationHasFailed(obj: ValidityState) {
  return !Object.values(obj).some(Boolean);
}

export function getAllScenarioDataIds(scenario: FormScenario): string[] {
  let result: string[] = [];

  for (const key of Object.keys(scenario.items)) {
    if ('items' in scenario.items[key]) {
      const keys = Object.keys((scenario.items[key] as FormSection).items);

      result = [...result, ...keys];
    } else result.push(key);
  }

  return result;
}

export function getAllItems(scenario: FormScenario): (FormItem | SectionFormItem)[] {
  let result: (FormItem | SectionFormItem)[] = [];

  Object.entries(scenario.items).forEach(([_, itemOrSection]) => {
    if ('items' in itemOrSection) result = [...result, ...Object.entries(itemOrSection.items).map(([_, item]) => item)];
    else result.push(itemOrSection);
  });

  return result;
}
