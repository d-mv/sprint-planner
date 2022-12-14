import { AnyValue, DayJS, RecordObject } from '@mv-d/toolbelt';

import { DbAssignedWork, DbEngineer, DbSprint, DbWork, FormScenario } from '../shared';

export enum StateActions {
  UNFOLD = 'unfold',
  UNAUTHORIZED = 'unauthorized',
  SET_SCENARIOS = 'setScenarios',
  SET_MESSAGE = 'setMessage',
  SET_IS_CONNECTED = 'setIsConnected',
  SET_IS_LOADING = 'setIsLoading',
  LOGIN = 'login',
  BOOT = 'boot',
  SET_SPRINTS = 'setSprints',
  ADD_SPRINT = 'addSprint',
  SET_ENGINEERS = 'setEngineers',
  ASSIGN_ENGINEER = 'assignEngineer',
  UPDATE_ENGINEER = 'updateEngineer',
  SET_ADDED_ENGINEERS = 'setAddedEngineers',
  SET_ASSIGNED_WORKS = 'setAssignedWorks',
  REMOVE_ASSIGNED_WORK = 'removeAssignedWork',
  ADD_ASSIGNED_WORK = 'addAssignedWork',
  SET_WORKS = 'setWorks',
  ADD_WORK = 'addWork',
  UPDATE_WORK = 'updateWork',
  UPDATE_ASSIGNED_WORK = 'updateAssignedWork',
  // to revise

  ADD_REMOVE_DAY_OFF = 'addRemoveDayOff',
  CREATE_ENGINEER = 'createEngineer',
  ADD_ENGINEER = 'addEngineer',
  ASSIGN_WORK = 'assignWork',
}

export interface Action<T = AnyValue> {
  type: StateActions;
  payload?: T;
  meta?: RecordObject;
}

export interface State {
  isLoading: RecordObject<boolean>;
  sprints: DbSprint[];
  daysOff: DayJS.Dayjs[];
  engineers: DbEngineer[];
  assignedEngineers: string[];
  works: DbWork[];
  assignedWorks: DbAssignedWork[];
  message: string;
  scenarios: RecordObject<FormScenario>;
  unfoldEngineers: string[];
  auth: {
    isConnected: boolean;
  };
}

export type Dispatch<T = unknown> = (action: Action<T>) => void;

export type MappedReducerFns = Map<StateActions, (state: State, action: Action) => State>;

export enum LoadingActions {
  GET_SCENARIOS = 'get-scenarios',
  GET_ASSIGNED_ENGINEERS = 'getAssignedEngineers',
  GET_ASSIGNED_WORK = 'get-assigned-work',
  GET_ENGINEERS = 'get-engineers',
  GET_SPRINT = 'get-sprint',
  GET_WORKS = 'get-works',
  GET_LOGIN = 'login',
}
