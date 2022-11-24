import { AnyValue, RecordObject, R, makePlural } from '@mv-d/toolbelt';

import { Person } from './engineer.models';

export function makeWorksQty(qtyWorks: number) {
  if (!qtyWorks) return '';

  return `${qtyWorks} ${makePlural('work', qtyWorks)}`;
}

export function makeName(person: Person) {
  return `${person.lastName}, ${person.firstName}`;
}

export function makeNewEngineerObject(form: RecordObject<AnyValue>) {
  const firstName = R.path(['firstName'], form);

  const lastName = R.path(['lastName'], form);

  const daysOff = R.path(['daysOff'], form);

  const person = { firstName, lastName };

  return { person, daysOff };
}
