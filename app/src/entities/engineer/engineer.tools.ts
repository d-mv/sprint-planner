import dayjs, { Dayjs } from 'dayjs';
import { path } from 'ramda';
import { AnyValue, DbEngineer, MongoDocument, RecordObject } from '../../shared';
import { Engineer, Person } from './engineer.models';

export function makeName(person: Person) {
  return `${person.lastName}, ${person.firstName}`;
}

export function engineerDaysOffToDayjs(engineer: DbEngineer<string>): DbEngineer {
  return { ...engineer, daysOff: engineer.daysOff.map(dayjs) };
}

export function engineersDaysOffToDayjs(
  engineers: MongoDocument<Engineer<string>>[],
): MongoDocument<Engineer<Dayjs>>[] {
  return engineers.map(engineerDaysOffToDayjs);
}

export function makeNewEngineerObject(form: RecordObject<AnyValue>) {
  const firstName = path(['firstName'], form);

  const lastName = path(['lastName'], form);

  const daysOff = path(['daysOff'], form);

  const person = { firstName, lastName };

  return { person, daysOff };
}
