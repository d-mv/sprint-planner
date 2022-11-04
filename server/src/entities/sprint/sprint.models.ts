export interface DayType<Day = Date> {
  date: Day;
  month: number;
  isWeekend?: boolean;
  isOff?: boolean;
  isWork?: boolean;
}

export interface Sprint<Day = Date> {
  name: string;
  startDate: Day;
  endDate: Day;
  days: DayType<Day>[];
}
