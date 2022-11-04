import { Dayjs } from 'dayjs';

export interface DayType<Day = Dayjs> {
  date: Day;
  month: number;
  isWeekend?: boolean;
  isOff?: boolean;
  isWork?: boolean;
}
