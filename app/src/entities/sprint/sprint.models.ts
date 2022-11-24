import { Dayjs } from 'dayjs';

import { DbDate } from '../../shared';

export interface Sprint<Day = Dayjs> {
  name: string;
  startDate: Day;
  endDate: Day;
  days: DbDate<Day>[];
}
