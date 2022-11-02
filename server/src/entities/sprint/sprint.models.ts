export interface Sprint {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  daysOff: Date[];
}

export interface SprintRequest {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  daysOff: string[];
}
