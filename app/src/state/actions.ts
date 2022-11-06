import { Dayjs } from 'dayjs';

import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { MongoDocument } from '../models';
import { Action, StateActions } from './types';

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

export const setEngineers = (payload: MongoDocument<Engineer>[]): Action => ({
  type: StateActions.SET_ENGINEERS,
  payload,
});

export const updateEngineer = (payload: Partial<MongoDocument<Engineer>>): Action => ({
  type: StateActions.UPDATE_ENGINEER,
  payload,
});

export const setAddedEngineers = (payload: string[]): Action => ({
  type: StateActions.SET_ADDED_ENGINEERS,
  payload,
});

export const setAssignedWorks = (payload: MongoDocument<AssignedWork>[]): Action => ({
  type: StateActions.SET_ASSIGNED_WORKS,
  payload,
});

export const removeAssignedWork = (payload: string): Action => ({
  type: StateActions.REMOVE_ASSIGNED_WORK,
  payload,
});

export const addAssignedWork = (payload: MongoDocument<AssignedWork>): Action => ({
  type: StateActions.ADD_ASSIGNED_WORK,
  payload,
});

export const setWorks = (payload: MongoDocument<Work>[]): Action => ({
  type: StateActions.SET_WORKS,
  payload,
});

// to revise:

export const addSprint = (payload: Sprint): Action => ({
  type: StateActions.ADD_SPRINT,
  payload,
});

export const addRemoveDayOff = (payload: Dayjs): Action => ({
  type: StateActions.ADD_REMOVE_DAY_OFF,
  payload,
});

export const createEngineer = (payload: Engineer): Action => ({
  type: StateActions.CREATE_ENGINEER,
  payload,
});

export const addEngineer = (payload: string): Action => ({
  type: StateActions.ADD_ENGINEER,
  payload,
});

export const addWork = (payload: Work): Action => ({
  type: StateActions.ADD_WORK,
  payload,
});

export const assignWork = (payload: AssignedWork): Action => ({
  type: StateActions.ASSIGN_WORK,
  payload,
});
