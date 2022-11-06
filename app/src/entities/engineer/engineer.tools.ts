import dayjs, { Dayjs } from 'dayjs';
import { MongoDocument } from '../../models';
import { Engineer, Person } from './engineer.models';

export function makeName(person: Person) {
  return `${person.lastName}, ${person.firstName}`;
}

export function engineerDaysOffToDayjs(engineers: MongoDocument<Engineer<string>>[]): MongoDocument<Engineer<Dayjs>>[] {
  return engineers.map(engineer => ({ ...engineer, daysOff: engineer.daysOff.map(dayjs) }));
}
