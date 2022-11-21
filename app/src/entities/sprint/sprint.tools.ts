import dayjs from 'dayjs';

import { DbSprint } from '../../shared';

export function sprintDateToDayjs(sprint: DbSprint<string>): DbSprint {
  return {
    ...sprint,
    startDate: dayjs(sprint.startDate),
    endDate: dayjs(sprint.endDate),
    days: sprint.days.map(day => ({ ...day, date: dayjs(day.date) })),
  };
}

export function sprintDateToDayjsArray(sprints: DbSprint<string>[]): DbSprint[] {
  return sprints.map(sprint => ({
    ...sprint,
    startDate: dayjs(sprint.startDate),
    endDate: dayjs(sprint.endDate),
    days: sprint.days.map(day => ({ ...day, date: dayjs(day.date) })),
  }));
}
