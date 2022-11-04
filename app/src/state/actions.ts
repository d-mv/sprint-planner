import { Dayjs } from 'dayjs';

import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { MongoDocument } from '../models';
import { Action, StateActions } from './types';

export const setIsLoading = (payload: [key: string, value: boolean]): Action => ({
  type: StateActions.SET_IS_LOADING,
  payload,
});

export const setAuthError = (payload: string): Action => ({
  type: StateActions.SET_AUTH_ERROR,
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

export const addRemoveEngineerDayOff = (payload: Dayjs): Action => ({
  type: StateActions.ADD_REMOVE_ENGINEER_DAY_OFF,
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

// assigned work ID
export const unAssignWork = (payload: string): Action => ({
  type: StateActions.UNASSIGN_WORK,
  payload,
});

export const updateEngineerDaysOff = (payload: { engineerId: string; days: Dayjs[] }): Action => ({
  type: StateActions.UPDATE_ENGINEER_DAYS_OFF,
  payload,
});
