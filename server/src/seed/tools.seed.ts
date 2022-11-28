import { DayJS } from '@mv-d/toolbelt';

export function binaryChoice<T>(opt1: T, opt2: T): T {
  const choice = Math.random() > 0.5;

  return choice ? opt1 : opt2;
}

export function generateEngineersDaysOff(start: DayJS.Dayjs): Date[] {
  const choice = binaryChoice(2, 4);

  return [start.add(choice, 'days').toDate()];
}
