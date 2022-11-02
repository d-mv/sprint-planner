import { Dayjs } from 'dayjs';

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Engineer {
  id: string;
  person: Person;
  daysOff: Dayjs[];
}
