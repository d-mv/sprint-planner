import { Dayjs } from 'dayjs';

export interface Work {
  id: string;
  jiraTicket: string;
  jiraEpic?: string;
  estimate: number;
  title: string;
}

export interface AssignedWork {
  id: string;
  workId: string;
  engineerId: string;
  start: Dayjs;
  // end: Dayjs;
}

export interface WorkToRender {
  id: string;
  work: Work;
  engineerId: string;
  start: Dayjs;
  // end: Dayjs;
}