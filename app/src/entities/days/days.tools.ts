import { nanoid } from 'nanoid';
import { compose, map } from 'ramda';

import { buildArray, checkIfWeekend, duration } from '../../tools';
import { Sprint } from '../sprint';
import { DayType } from './days.models';

export function buildSprintDays(sprint: Sprint): DayType[] {
  function mapperFn(n: number): DayType {
    const date = sprint.startDate.add(n, 'days');
    const month = parseInt(date.month().toString()) + 1;
    return {
      id: nanoid(),
      date,
      month,
      isWeekend: checkIfWeekend(date),
    };
  }

  return compose(
    map(mapperFn),
    buildArray,
    duration
  )(sprint.startDate, sprint.endDate);
}
