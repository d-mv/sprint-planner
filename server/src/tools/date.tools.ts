import dayjs, { Dayjs } from 'dayjs';
import { compose, map } from 'ramda';
import { DayType, Engineer, Sprint } from '../entities';
import { buildArray } from './object.tools';
import durationPlugin from 'dayjs/plugin/duration';
import { Document, Types } from 'mongoose';
import { AnyValue } from '../models';

dayjs.extend(durationPlugin);

export function duration(start: Dayjs, end: Dayjs): number {
  return end.diff(start, 'days', false);
}

export function checkIfWeekend(date: Dayjs): boolean {
  return [5, 6].includes(date.day());
}

export function format(date: Dayjs) {
  return date.format('YYYY-MM-DD');
}

export function buildSprintDays(date: Sprint<string> & { daysOff: string[] }): DayType[] {
  const { startDate, endDate, daysOff } = date;

  const start = dayjs(startDate);

  const end = dayjs(endDate);

  function mapperFn(n: number): DayType {
    const date = start.add(n, 'days');

    const month = parseInt(date.month().toString()) + 1;

    return {
      date: date.toDate(),
      month,
      isWeekend: checkIfWeekend(date),
      isOff: daysOff.includes(format(date)),
    };
  }

  return compose(map(mapperFn), buildArray, duration)(start, end);
}

const sorter = (a: Date, b: Date) => {
  return dayjs(a).diff(dayjs(b), 'days');
};

type E = Document<unknown, AnyValue, Engineer> &
  Engineer & {
    _id: Types.ObjectId;
  };

export function sortDaysOff(engineer: E) {
  const json = engineer.toJSON();

  return { ...json, daysOff: json.daysOff.sort(sorter) };
}
