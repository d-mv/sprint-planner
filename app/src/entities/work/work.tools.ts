import { dayjs } from '@mv-d/toolbelt';

import { DbAssignedWork } from '../../shared';

export function assignedWorkDayToDayjs(work: DbAssignedWork<string>): DbAssignedWork {
  return { ...work, startDate: dayjs(work.startDate) };
}

export function assignedWorksDayToDayjs(data: DbAssignedWork<string>[]): DbAssignedWork[] {
  return data.map(assignedWorkDayToDayjs);
}
