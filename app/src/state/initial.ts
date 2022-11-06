import { State } from '.';
import { dayOff } from './seed';

export const INITIAL_STATE: State = {
  isLoading: {},
  sprints: [],
  daysOff: [dayOff],
  engineers: [],
  addedEngineers: [],
  works: [],
  assignedWorks: [],
  auth: { error: '', isConnected: false },
};
