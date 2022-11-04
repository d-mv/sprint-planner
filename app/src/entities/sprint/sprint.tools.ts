import dayjs, { Dayjs } from 'dayjs';

import { MongoDocument } from '../../models';
import { Sprint } from './sprint.models';

export function sprintDateToDayjs(sprints: MongoDocument<Sprint>[]): MongoDocument<Sprint<Dayjs>>[] {
  return sprints.map(sprint => ({
    ...sprint,
    startDate: dayjs(sprint.startDate),
    endDate: dayjs(sprint.endDate),
    days: sprint.days.map(day => ({ ...day, date: dayjs(day.date) })),
  }));
}
