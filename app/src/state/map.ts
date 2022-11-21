import { Dayjs } from 'dayjs';
import { assoc } from 'ramda';

import { DbAssignedWork, DbEngineer, DbSprint, DbWork, FormScenario, RecordObject } from '../shared';
import { INITIAL_STATE } from './initial';
import { Action, MappedReducerFns, StateActions, State } from './types';

export const MAP: MappedReducerFns = new Map();

MAP.set(StateActions.SET_SCENARIOS, (state: State, action: Action<RecordObject<FormScenario>>) => {
  return assoc('scenarios', action.payload ?? {}, state);
});

MAP.set(StateActions.SET_MESSAGE, (state: State, action: Action<string>) => {
  return assoc('message', action.payload ?? '', state);
});

MAP.set(StateActions.SET_IS_CONNECTED, (state: State, action: Action<boolean>) => {
  if (action.payload === undefined) return state;

  return action.payload ? assoc('auth', assoc('isConnected', action.payload, state.auth), state) : INITIAL_STATE;
});

MAP.set(StateActions.SET_IS_LOADING, (state: State, action: Action<[key: string, value: boolean]>) => {
  if (!action.payload) return state;

  const [key, value] = action.payload;

  return assoc('isLoading', assoc(key, value, state.isLoading), state);
});

MAP.set(StateActions.SET_SPRINTS, (state: State, action: Action<DbSprint[]>) => {
  if (!action.payload) return state;

  return { ...state, sprints: action.payload };
});

MAP.set(StateActions.ADD_SPRINT, (state: State, action: Action<DbSprint>) => {
  if (!action.payload) return state;

  return { ...state, sprints: [...state.sprints, action.payload] };
});

MAP.set(StateActions.SET_ENGINEERS, (state: State, action: Action<DbEngineer[]>) => {
  if (!action.payload) return state;

  return { ...state, engineers: action.payload };
});

MAP.set(StateActions.ADD_ENGINEER, (state: State, action: Action<DbEngineer>) => {
  if (!action.payload) return state;

  return assoc('engineers', [...state.engineers, action.payload], state);
});

MAP.set(StateActions.ASSIGN_ENGINEER, (state: State, action: Action<string>) => {
  if (!action.payload) return state;

  return assoc('assignedEngineers', [...state.assignedEngineers, action.payload], state);
});

MAP.set(StateActions.UPDATE_ENGINEER, (state: State, action: Action<Partial<DbEngineer>>) => {
  if (!action.payload || !action.payload._id) return state;

  return {
    ...state,
    engineers: state.engineers.map(engineer => {
      if (engineer._id !== action.payload?._id) return engineer;

      return { ...engineer, ...action.payload };
    }),
  };
});

MAP.set(StateActions.SET_ADDED_ENGINEERS, (state: State, action: Action<string[]>) => {
  if (!action.payload) return state;

  return { ...state, assignedEngineers: action.payload };
});

MAP.set(StateActions.SET_ASSIGNED_WORKS, (state: State, action: Action<DbAssignedWork[]>) => {
  if (!action.payload) return state;

  return { ...state, assignedWorks: action.payload };
});

MAP.set(StateActions.REMOVE_ASSIGNED_WORK, (state: State, action: Action<string>) => {
  if (!action.payload) return state;

  return { ...state, assignedWorks: state.assignedWorks.filter(work => work._id !== action.payload) };
});

MAP.set(StateActions.ADD_ASSIGNED_WORK, (state: State, action: Action<DbAssignedWork>) => {
  if (!action.payload) return state;

  return { ...state, assignedWorks: [...state.assignedWorks, action.payload] };
});

MAP.set(StateActions.SET_WORKS, (state: State, action: Action<DbWork[]>) => {
  if (!action.payload) return state;

  return { ...state, works: action.payload };
});

MAP.set(StateActions.ADD_WORK, (state: State, action: Action<DbWork>) => {
  if (!action.payload) return state;

  return assoc('works', [...state.works, action.payload], state);
});

MAP.set(StateActions.UPDATE_WORK, (state: State, action: Action<DbWork>) => {
  if (!action.payload) return state;

  const works = state.works.map(work => {
    if (work._id === action.payload?._id) return action.payload;

    return work;
  });

  return assoc('works', works, state);
});

MAP.set(StateActions.UPDATE_ASSIGNED_WORK, (state: State, action: Action<DbAssignedWork>) => {
  if (!action.payload) return state;

  const works = state.assignedWorks.map(work => {
    if (work._id === action.payload?._id) return action.payload;

    return work;
  });

  return assoc('assignedWorks', works, state);
});
// to revise
MAP.set(StateActions.ADD_REMOVE_DAY_OFF, (state: State, action: Action<Dayjs>) => {
  if (!action.payload) return state;

  const isPresent = state.daysOff.find(d => d.isSame(action.payload, 'date'));

  if (isPresent)
    return assoc(
      'daysOff',
      state.daysOff.filter(d => !d.isSame(action.payload, 'date')),
      state,
    );

  return assoc('daysOff', [...state.daysOff, action.payload], state);
});

// MAP.set(StateActions.CREATE_ENGINEER, (state: State, action: Action<Engineer>) => {
//   if (!action.payload) return state;

//   return assoc('engineers', [...state.engineers, action.payload], state);
// });

MAP.set(StateActions.ASSIGN_WORK, (state: State, action: Action<DbAssignedWork>) => {
  if (!action.payload) return state;

  return assoc('assignedWorks', [...state.assignedWorks, action.payload], state);
});
