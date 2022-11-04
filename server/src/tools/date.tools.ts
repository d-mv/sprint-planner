import dayjs, { Dayjs } from 'dayjs';
import { compose, map } from 'ramda';
import { DayType } from '../entities';
import { buildArray } from './object.tools';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export function duration(start: Dayjs, end: Dayjs): number {
  return end.diff(start, 'days', false);
}

export function checkIfWeekend(date: Dayjs): boolean {
  return [5, 6].includes(date.day());
}

export function buildSprintDays(startDate: string, endDate: string): DayType[] {
  const start = dayjs(startDate);

  const end = dayjs(endDate);

  function mapperFn(n: number): DayType {
    const date = start.add(n, 'days');

    const month = parseInt(date.month().toString()) + 1;

    return {
      date: date.toDate(),
      month,
      isWeekend: checkIfWeekend(date),
    };
  }

  return compose(map(mapperFn), buildArray, duration)(start, end);
}
