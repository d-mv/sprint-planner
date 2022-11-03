import { Sprint, SprintRequest } from './sprint.models';

export function incomingSprintToDbFormat(data: SprintRequest): Sprint {
  return {
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    daysOff: data.daysOff.map(day => new Date(day)),
  };
}
