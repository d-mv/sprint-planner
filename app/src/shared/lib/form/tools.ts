import { compose, isEmpty, isNil, path } from 'ramda';
import { FormEvent } from 'react';
import { AnyValue, RecordObject, Option } from '../../models';
import { FormItem, FormItemValue, FormItemValueTypes, FormScenario, FormSection, SectionFormItem } from './models';
import dayjs, { Dayjs } from 'dayjs';
import { format } from '../day.tools';
import { Duration, DurationUnitsObjectType, DurationUnitType } from 'dayjs/plugin/duration';
import { isObject } from '../object.tools';
import { makeMatch } from '../../tools';

export function add(nDays: number, item: DurationUnitType) {
  return function call(day: Dayjs) {
    return day.add(nDays, item);
  };
}

export function subtract(nDays: number, item: DurationUnitType) {
  return function call(day: Dayjs) {
    return day.subtract(nDays, item);
  };
}

export function checkIfAddDays(value: Option<string>): Option<string> {
  const plus = value?.match(/\+/);

  if (plus && plus[0] === '+') {
    const n = parseInt(value?.replace(/\+/, '') ?? '0');

    return compose(format(), add(n, 'days'))(dayjs());
  }

  return undefined;
}

export function checkIfSubtractDays(value: Option<string>): Option<string> {
  const minus = value?.match(/-/);

  if (minus && minus[0] === '-') {
    const n = parseInt(value?.replace(/-/, '') ?? '0');

    return compose(format(), subtract(n, 'days'))(dayjs());
  }

  return undefined;
}

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

  const items = compose(getAllFormScenarioItemsWithValidation, getAllItems)(scenario);

  items.forEach(item => {
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
    if (value) result = true;
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

    if (!(key in validated)) return;

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

const ARRAY_METHODS = makeMatch(
  {
    first: (data: unknown[]) => data[0],
  },
  () => undefined,
);

function makeDefaultValueFromObject({ type, value }: FormItemValue, data?: unknown[]) {
  if (type === FormItemValueTypes.DATE) {
    if (value === 'current') return compose(format(), dayjs)();

    const plus = checkIfAddDays(value);

    if (plus) return plus;

    const minus = checkIfSubtractDays(value);

    if (minus) return minus;

    return compose(format(), dayjs)(value);
  } else if (type === FormItemValueTypes.DATA_SET) {
    return ARRAY_METHODS[value](data ?? []) ?? '';
  }

  return '';
}

export function makeDefaultValue(defaultValue: Option<string | FormItemValue>, data?: unknown[]): AnyValue {
  if (!defaultValue) return '';

  if (isObject(defaultValue)) return makeDefaultValueFromObject(defaultValue as FormItemValue, data);

  return defaultValue as string;
}
