import { Dayjs } from 'dayjs';

import { DbWork } from '../../shared';

export interface Work {
  jiraTicket: string;
  jiraEpic?: string;
  estimate: number;
  title: string;
}

export interface AssignedWork<Day = Dayjs> {
  workId: string;
  engineerId: string;
  startDate: Day;
}

export interface WorkToRender {
  work: DbWork;
  engineerId: string;
  startDate: Dayjs;
}
