import { isWeekend, buildIntArray, Optional, R, add, subtract, DayJS, dayjs } from '@mv-d/toolbelt';

export function format(format = 'YYYY-MM-DD') {
  return function call(date: DayJS.Dayjs) {
    return date.format(format);
  };
}

export function getWorkingDaysDiff(from: DayJS.Dayjs, till: DayJS.Dayjs): number {
  let counter = 0;

  const totalDays = till.diff(from, 'days');

  const forEachFn = (d: number) => {
    const day = from.add(d, 'days');

    if (!isWeekend(day)) counter += 1;
  };

  buildIntArray(totalDays).forEach(forEachFn);

  return counter;
}

export function checkIfAddDays(value: Optional<string>): Optional<string> {
  const plus = value?.match(/\+/);

  if (plus && plus[0] === '+') {
    const n = parseInt(value?.replace(/\+/, '') ?? '0');

    return R.compose(format(), add(n, 'days'))(dayjs());
  }

  return undefined;
}

export function checkIfSubtractDays(value: Optional<string>): Optional<string> {
  const minus = value?.match(/-/);

  if (minus && minus[0] === '-') {
    const n = parseInt(value?.replace(/-/, '') ?? '0');

    return R.compose(format(), subtract(n, 'days'))(dayjs());
  }

  return undefined;
}
