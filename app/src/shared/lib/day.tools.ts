import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import durationPlugin from 'dayjs/plugin/duration';

import { buildArray } from './array.tools';

dayjs.extend(isBetween);
dayjs.extend(durationPlugin);

export function format(date: Dayjs) {
  return date.format('YYYY-MM-DD');
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
