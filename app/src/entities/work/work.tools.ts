import dayjs from 'dayjs';

import { AssignedWork } from '..';
import { MongoDocument } from '../../models';

export function assignedWorkDayToDayjs(work: MongoDocument<AssignedWork<string>>): MongoDocument<AssignedWork> {
  return { ...work, startDate: dayjs(work.startDate) };
}

export function assignedWorksDayToDayjs(data: MongoDocument<AssignedWork<string>>[]): MongoDocument<AssignedWork>[] {
  return data.map(assignedWorkDayToDayjs);
}
