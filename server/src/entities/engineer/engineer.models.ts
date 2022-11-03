export interface Person {
  firstName: string;
  lastName: string;
}

export interface Engineer {
  id: string;
  person: Person;
  daysOff: Date[];
}
