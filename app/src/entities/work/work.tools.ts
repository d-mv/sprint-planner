import dayjs from 'dayjs';
import { AssignedWork } from '..';
import { MongoDocument } from '../../models';

export function assignedWorksDayToDayjs(data: MongoDocument<AssignedWork<string>>[]): MongoDocument<AssignedWork>[] {
  return data.map(work => ({ ...work, startDate: dayjs(work.startDate) }));
}
