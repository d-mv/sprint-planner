import { Dayjs } from 'dayjs';

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Engineer<Day = Dayjs> {
  person: Person;
  daysOff: Day[];
}
