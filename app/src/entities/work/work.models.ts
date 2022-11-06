import { Dayjs } from 'dayjs';

import { MongoDocument } from '../../models';

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
  work: MongoDocument<Work>;
  engineerId: string;
  startDate: Dayjs;
}
