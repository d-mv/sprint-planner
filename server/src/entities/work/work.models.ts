export interface Work {
  jiraTicket: string;
  jiraEpic: string;
  estimate: number;
  title: string;
}

export interface AssignedWork {
  workId: string;
  engineerId: string;
  startDate: Date;
}
