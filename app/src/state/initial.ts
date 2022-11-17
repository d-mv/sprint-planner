import { State } from '.';

export const INITIAL_STATE: State = {
  isLoading: {},
  sprints: [],
  daysOff: [],
  engineers: [],
  addedEngineers: [],
  works: [],
  assignedWorks: [],
  message: '',
  auth: { isConnected: false },
};
