import dayjs, { Dayjs } from 'dayjs';

import { MongoDocument } from '../../shared';
import { Sprint } from './sprint.models';

export function sprintDateToDayjs(sprint: MongoDocument<Sprint>): MongoDocument<Sprint<Dayjs>> {
  return {
    ...sprint,
    startDate: dayjs(sprint.startDate),
    endDate: dayjs(sprint.endDate),
    days: sprint.days.map(day => ({ ...day, date: dayjs(day.date) })),
  };
}

export function sprintDateToDayjsArray(sprints: MongoDocument<Sprint>[]): MongoDocument<Sprint<Dayjs>>[] {
  return sprints.map(sprint => ({
    ...sprint,
    startDate: dayjs(sprint.startDate),
    endDate: dayjs(sprint.endDate),
    days: sprint.days.map(day => ({ ...day, date: dayjs(day.date) })),
  }));
}
