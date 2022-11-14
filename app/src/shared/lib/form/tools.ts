import { compose, isEmpty, isNil, path } from 'ramda';
import { FormEvent } from 'react';
import { AnyValue, RecordObject } from '../../../models';
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

export function getAllFormScenarioDataIds(items: (FormItem | SectionFormItem)[]): string[] {
  return items.map(({ dataId }) => dataId);
}

export function getAllFormScenarioItemsWithValidation(
  items: (FormItem | SectionFormItem)[],
): (FormItem | SectionFormItem)[] {
  return items.filter(item => !!item.validation);
}

export function getAllRequiredFormScenarioItems(items: (FormItem | SectionFormItem)[]): (FormItem | SectionFormItem)[] {
  return items.filter(item => !!item.isRequired);
}

export function buildInitialValidation(scenario: FormScenario): RecordObject<boolean> {
  const result: RecordObject<boolean> = {};

  // const alltems = compose(getAllFormScenarioItemsWithValidation, getAllItems)(scenario);
  const alltems = getAllItems(scenario);

  // eslint-disable-next-line no-console
  console.log('hiii', alltems);

  const its = getAllFormScenarioItemsWithValidation(alltems);

  // eslint-disable-next-line no-console
  console.log('hi2', its);

  // eslint-disable-next-line no-console
  console.log('hi', its);

  its.forEach(item => {
    result[item.dataId] = false;
  });
  return result;
}

export function buildInitialRequired(scenario: FormScenario): RecordObject<boolean> {
  const result: RecordObject<boolean> = {};

  const items = compose(getAllRequiredFormScenarioItems, getAllItems)(scenario);

  items.forEach(item => {
    result[item.dataId] = false;
  });
  return result;
}

export function getAllRequiredAreValid(required: RecordObject<boolean>, validated: RecordObject<boolean>): boolean {
  if (!Object.values(required).every(Boolean)) return false;

  let result = true;

  Object.entries(required).forEach(([key, value]) => {
    if (!value) result = true;
    else {
      if (value !== validated[key]) result = false;
    }
  });
  return result;
}

export function getAllEnteredDataIsValid(data: RecordObject<AnyValue>, validated: RecordObject<boolean>): boolean {
  let result = true;

  Object.entries(data).forEach(([key, value]) => {
    if (isEmpty(value) || isNil(value)) return;

    if (!validated[key]) result = false;
  });

  return result;
}

export async function buildForm(scenario: FormScenario, e: FormEvent<HTMLFormElement>) {
  const form = new FormData();

  for await (const dataId of getAllScenarioDataIds(scenario)) {
    const value = path(['target', 'elements', dataId, 'value'], e) as string;

    if (value !== undefined) form.set(dataId, value);
  }

  return form;
}
