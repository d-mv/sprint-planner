import { DayJS } from '@mv-d/toolbelt';

export interface DayType<Day = DayJS.Dayjs> {
  date: Day;
  month: number;
  isWeekend?: boolean;
  isOff?: boolean;
  isWork?: boolean;
}
