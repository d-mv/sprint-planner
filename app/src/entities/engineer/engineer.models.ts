import { Dayjs } from 'dayjs';

export interface Person {
  firstName: string;
  lastName: string;
}

export interface EngineerType<Day = Dayjs> {
  person: Person;
  daysOff: Day[];
}
