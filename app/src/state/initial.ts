import { State } from '.';
import { assignedWork, dayOff, engineers, works } from './seed';

export const INITIAL_STATE: State = {
  isLoading: {},
  sprints: [],
  daysOff: [dayOff],
  engineers,
  addedEngineers: ['xxxx', 'xxxx2', 'xxxx3'],
  works,
  assignedWorks: [assignedWork],
  auth: { error: '', isConnected: false },
};
