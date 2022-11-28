import { AnyValue, buildIntArray, dayjs, DayJS, duration, isWeekend, R, sortDays } from '@mv-d/toolbelt';
import { Document, Types } from 'mongoose';

import { DayType, Engineer, Sprint } from '../entities';

export function format(date: DayJS.Dayjs) {
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
      isWeekend: isWeekend(date),
      isOff: (daysOff ?? []).includes(format(date)),
    };
  }

  return R.compose(R.map(mapperFn), buildIntArray, duration)(start, end);
}

type E = Document<unknown, AnyValue, Engineer> &
  Engineer & {
    _id: Types.ObjectId;
  };

export function sortDaysOff(engineer: E) {
  const json = engineer.toJSON();

  return { ...json, daysOff: sortDays(json.daysOff) };
}
