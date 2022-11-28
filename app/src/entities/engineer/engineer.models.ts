import { DayJS } from '@mv-d/toolbelt';

export interface Person {
  firstName: string;
  lastName: string;
}

export interface EngineerType<Day = DayJS.Dayjs> {
  person: Person;
  daysOff: Day[];
}
