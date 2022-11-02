import { Dayjs } from 'dayjs';

export interface DayType {
  id: string;
  date: Dayjs;
  month: number;
  isWeekend?: boolean;
  isOff?: boolean;
  isWork?: boolean;
}
