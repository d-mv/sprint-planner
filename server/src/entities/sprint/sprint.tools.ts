import { buildSprintDays } from '../../tools';
import { Sprint } from './sprint.models';

export function incomingSprintToDbFormat(data: Sprint<string> & { daysOff: string[] }): Sprint {
  const sprint = {
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    days: [],
  };

  return { ...sprint, days: buildSprintDays(data) };
}
