import dayjs, { Dayjs, extend } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import durationPlugin, { DurationUnitType } from 'dayjs/plugin/duration';

import { buildArray } from './array.tools';
import { Option } from '../models';
import { compose } from 'ramda';

extend(isBetween);
extend(durationPlugin);

export function format(format = 'YYYY-MM-DD') {
  return function call(date: Dayjs) {
    return date.format(format);
  };
}

export function duration(start: Dayjs, end: Dayjs): number {
  return end.diff(start, 'days', false);
}

export function checkIfWeekend(date: Dayjs): boolean {
  return [5, 6].includes(date.day());
}

export function checkIfBetween(day: Dayjs, start: Dayjs, end: Dayjs) {
  return day.isBetween(start, end, 'days');
}

export function getWorkingDaysDiff(from: Dayjs, till: Dayjs): number {
  let counter = 0;

  const totalDays = till.diff(from, 'days');

  const forEachFn = (d: number) => {
    const day = from.add(d, 'days');

    if (!checkIfWeekend(day)) counter += 1;
  };

  buildArray(totalDays).forEach(forEachFn);

  return counter;
}

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
