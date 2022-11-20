import { State } from '.';

export const INITIAL_STATE: State = {
  assignedEngineers: [],
  assignedWorks: [],
  auth: { isConnected: false },
  daysOff: [],
  engineers: [],
  isLoading: {},
  message: '',
  scenarios: {},
  sprints: [],
  works: [],
};
