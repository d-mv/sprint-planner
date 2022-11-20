import { Dayjs } from 'dayjs';

import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { DbAssignedWork, DbEngineer, FormScenario, MongoDocument, RecordObject } from '../shared';
import { Action, StateActions } from './types';

export const setScenarios = (payload: RecordObject<FormScenario>): Action => ({
  type: StateActions.SET_SCENARIOS,
  payload,
});

export const setIsLoading = (payload: [key: string, value: boolean]): Action => ({
  type: StateActions.SET_IS_LOADING,
  payload,
});

export const setMessage = (payload: string): Action => ({
  type: StateActions.SET_MESSAGE,
  payload,
});

export const setIsConnected = (payload: boolean): Action => ({
  type: StateActions.SET_IS_CONNECTED,
  payload,
});

export const login = (payload: string): Action => ({
  type: StateActions.LOGIN,
  payload,
});

export const setSprints = (payload: MongoDocument<Sprint<Dayjs>>[]): Action => ({
  type: StateActions.SET_SPRINTS,
  payload,
});

export const addSprint = (payload: MongoDocument<Sprint<Dayjs>>): Action => ({
  type: StateActions.ADD_SPRINT,
  payload,
});

export const setEngineers = (payload: DbEngineer[]): Action => ({
  type: StateActions.SET_ENGINEERS,
  payload,
});

export const addEngineer = (payload: DbEngineer): Action => ({
  type: StateActions.ADD_ENGINEER,
  payload,
});

export const updateEngineer = (payload: Partial<DbEngineer>): Action => ({
  type: StateActions.UPDATE_ENGINEER,
  payload,
});

export const setAssignedEngineers = (payload: string[]): Action => ({
  type: StateActions.SET_ADDED_ENGINEERS,
  payload,
});

export const assignEngineer = (payload: string): Action => ({
  type: StateActions.ASSIGN_ENGINEER,
  payload,
});

export const setAssignedWorks = (payload: DbAssignedWork[]): Action => ({
  type: StateActions.SET_ASSIGNED_WORKS,
  payload,
});

export const removeAssignedWork = (payload: string): Action => ({
  type: StateActions.REMOVE_ASSIGNED_WORK,
  payload,
});

export const addAssignedWork = (payload: DbAssignedWork): Action => ({
  type: StateActions.ADD_ASSIGNED_WORK,
  payload,
});

export const setWorks = (payload: MongoDocument<Work>[]): Action => ({
  type: StateActions.SET_WORKS,
  payload,
});

export const addWork = (payload: MongoDocument<Work>): Action => ({
  type: StateActions.ADD_WORK,
  payload,
});

export const updateWork = (payload: MongoDocument<Work>): Action => ({
  type: StateActions.UPDATE_WORK,
  payload,
});

export const updateAssignedWork = (payload: DbAssignedWork): Action => ({
  type: StateActions.UPDATE_ASSIGNED_WORK,
  payload,
});

// to revise:
export const addRemoveDayOff = (payload: Dayjs): Action => ({
  type: StateActions.ADD_REMOVE_DAY_OFF,
  payload,
});

export const assignWork = (payload: AssignedWork): Action => ({
  type: StateActions.ASSIGN_WORK,
  payload,
});
