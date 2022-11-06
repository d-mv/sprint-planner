import { Dayjs } from 'dayjs';

import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { AnyValue, MongoDocument, RecordObject } from '../models';

export enum StateActions {
  SET_AUTH_ERROR = 'setAuthError',
  SET_IS_CONNECTED = 'setIsConnected',
  SET_IS_LOADING = 'setIsLoading',
  LOGIN = 'login',
  BOOT = 'boot',
  SET_SPRINTS = 'setSprints',
  SET_ENGINEERS = 'setEngineers',
  SET_ADDED_ENGINEERS = 'setAddedEngineers',
  SET_ASSIGNED_WORKS = 'setAssignedWorks',
  SET_WORKS = 'setWorks',
  // to revise
  ADD_SPRINT = 'addSprint',
  ADD_REMOVE_DAY_OFF = 'addRemoveDayOff',
  CREATE_ENGINEER = 'createEngineer',
  ADD_REMOVE_ENGINEER_DAY_OFF = 'addRemoveEngineerDayOff',
  ADD_ENGINEER = 'addEngineer',
  ADD_WORK = 'addWork',
  ASSIGN_WORK = 'assignWork',
  UNASSIGN_WORK = 'unassignWork',
  UPDATE_ENGINEER_DAYS_OFF = 'updateEngineerDaysOff',
}

export interface Action<T = AnyValue> {
  type: StateActions;
  payload?: T;
  meta?: RecordObject;
}

export interface State {
  isLoading: RecordObject<boolean>;
  sprints: MongoDocument<Sprint<Dayjs>>[];
  daysOff: Dayjs[];
  engineers: MongoDocument<Engineer>[];
  addedEngineers: string[];
  works: MongoDocument<Work>[];
  assignedWorks: MongoDocument<AssignedWork>[];
  auth: {
    // authString: string;
    isConnected: boolean;
    error: string;
  };
}

export type Dispatch<T = unknown> = (action: Action<T>) => void;

export type MappedReducerFns = Map<StateActions, (state: State, action: Action) => State>;
