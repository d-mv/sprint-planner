import dayjs from 'dayjs';

import { DbEngineer } from '../models';

export function engineerDaysOffToDayjs(engineer: DbEngineer<string>): DbEngineer {
  return { ...engineer, daysOff: engineer.daysOff.map(dayjs) };
}

export function engineersDaysOffToDayjs(engineers: DbEngineer<string>[]): DbEngineer[] {
  return engineers.map(engineerDaysOffToDayjs);
}
