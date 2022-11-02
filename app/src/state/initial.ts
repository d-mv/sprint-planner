import { State } from '.';
import { assignedWork, dayOff, engineers, sprint, works } from './seed';

export const INITIAL_STATE: State = {
  sprints: [sprint],
  daysOff: [dayOff],
  engineers,
  addedEngineers: ['xxxx','xxxx2','xxxx3'],
  works,
  assignedWorks: [assignedWork],
};
