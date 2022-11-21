import { path } from 'ramda';

import { AnyValue, RecordObject } from '../../shared';
import { Person } from './engineer.models';

export function makeName(person: Person) {
  return `${person.lastName}, ${person.firstName}`;
}

export function makeNewEngineerObject(form: RecordObject<AnyValue>) {
  const firstName = path(['firstName'], form);

  const lastName = path(['lastName'], form);

  const daysOff = path(['daysOff'], form);

  const person = { firstName, lastName };

  return { person, daysOff };
}
