export interface Sprint {
  name: string;
  startDate: Date;
  endDate: Date;
  daysOff: Date[];
}

export interface SprintRequest {
  name: string;
  startDate: string;
  endDate: string;
  daysOff: string[];
}
