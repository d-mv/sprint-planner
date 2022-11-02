import { Dayjs } from 'dayjs';

import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { AnyValue, RecordObject } from '../models';

export enum StateActions {
  BOOT='boot',
  ADD_SPRINT = 'addSprint',
  ADD_REMOVE_DAY_OFF = 'addRemoveDayOff',
  CREATE_ENGINEER = 'createEngineer',
  ADD_REMOVE_ENGINEER_DAY_OFF = 'addRemoveEngineerDayOff',
  ADD_ENGINEER = 'addEngineer',
  ADD_WORK = 'addWork',
  ASSIGN_WORK = 'assignWork',
  UNASSIGN_WORK = 'unassignWork',
  UPDATE_ENGINEER_DAYS_OFF = 'updateEngineerDaysOff'
}

export interface Action<T = AnyValue> {
  type: StateActions;
  payload?: T;
  meta?: RecordObject;
}

export interface State {
  sprints: Sprint[];
  daysOff: Dayjs[];
  engineers: Engineer[];
  addedEngineers: string[];
  works: Work[];
  assignedWorks: AssignedWork[];
}

export type Dispatch<T = unknown> = (action: Action<T>) => void;

export type MappedReducerFns = Map<
  StateActions,
  (state: State, action: Action) => State
>;
