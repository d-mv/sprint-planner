import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import durationPlugin from 'dayjs/plugin/duration';
import { compose, map } from 'ramda';

import { buildArray } from '../../tools';
import { Sprint } from '../sprint';
import { DayType } from './days.models';

dayjs.extend(isBetween);
dayjs.extend(durationPlugin);

export function duration(start: Dayjs, end: Dayjs): number {
  return end.diff(start, 'days', false);
}

export function checkIfWeekend(date: Dayjs): boolean {
  return [5, 6].includes(date.day());
}

export function checkIfBetween(day: Dayjs, start: Dayjs, end: Dayjs) {
  return day.isBetween(start, end, 'days');
}

export function buildSprintDays(sprint: Sprint): DayType[] {
  function mapperFn(n: number): DayType {
    const date = sprint.startDate.add(n, 'days');

    const month = parseInt(date.month().toString()) + 1;

    return {
      date,
      month,
      isWeekend: checkIfWeekend(date),
    };
  }

  return compose(map(mapperFn), buildArray, duration)(sprint.startDate, sprint.endDate);
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
