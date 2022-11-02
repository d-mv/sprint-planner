import dayjs, { Dayjs } from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';

dayjs.extend(durationPlugin);

export function duration(start: Dayjs, end: Dayjs): number {
  return end.diff(start, 'days', false);
}

export function checkIfWeekend(date: Dayjs): boolean {
  return [5, 6].includes(date.day());
}
