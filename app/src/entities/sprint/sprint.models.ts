import { DayJS } from '@mv-d/toolbelt';

import { DbDate } from '../../shared';

export interface Sprint<Day = DayJS.Dayjs> {
  name: string;
  startDate: Day;
  endDate: Day;
  days: DbDate<Day>[];
}
