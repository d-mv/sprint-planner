import { Dayjs } from 'dayjs';
import { MongoDocument } from '../../models';

import { DayType } from '../days';

export interface Sprint<Day = Dayjs> {
  name: string;
  startDate: Day;
  endDate: Day;
  days: MongoDocument<DayType<Day>>[];
}
