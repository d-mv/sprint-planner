import { DayJS } from '@mv-d/toolbelt';

import { DbWork } from '../../shared';

export interface Work {
  jiraTicket: string;
  jiraEpic?: string;
  estimate: number;
  title: string;
}

export interface AssignedWork<Day = DayJS.Dayjs> {
  workId: string;
  engineerId: string;
  startDate: Day;
}

export interface WorkToRender {
  work: DbWork;
  engineerId: string;
  startDate: DayJS.Dayjs;
}
