import { Dayjs } from 'dayjs';
import { assoc } from 'ramda';
import { AssignedWork, Engineer, Sprint, Work } from '../entities';
import { MongoDocument } from '../models';
import { Action, MappedReducerFns, StateActions, State } from './types';

export const MAP: MappedReducerFns = new Map();

MAP.set(StateActions.SET_AUTH_ERROR, (state: State, action: Action<string>) => {
  return assoc('auth', assoc('error', action.payload ?? '', state.auth), state);
});
MAP.set(StateActions.SET_IS_CONNECTED, (state: State, action: Action<boolean>) => {
  if (!action.payload) return state;

  return assoc('auth', assoc('isConnected', action.payload, state.auth), state);
});
MAP.set(StateActions.SET_IS_LOADING, (state: State, action: Action<[key: string, value: boolean]>) => {
  if (!action.payload) return state;

  const [key, value] = action.payload;

  return assoc('isLoading', assoc(key, value, state.isLoading), state);
});

MAP.set(StateActions.SET_SPRINTS, (state: State, action: Action<MongoDocument<Sprint<Dayjs>>[]>) => {
  if (!action.payload) return state;

  return { ...state, sprints: action.payload };
});

MAP.set(StateActions.SET_ENGINEERS, (state: State, action: Action<MongoDocument<Engineer>[]>) => {
  if (!action.payload) return state;

  return { ...state, engineers: action.payload };
});

MAP.set(StateActions.SET_ADDED_ENGINEERS, (state: State, action: Action<string[]>) => {
  if (!action.payload) return state;

  return { ...state, addedEngineers: action.payload };
});

MAP.set(StateActions.SET_ASSIGNED_WORKS, (state: State, action: Action<MongoDocument<AssignedWork>[]>) => {
  if (!action.payload) return state;

  return { ...state, assignedWorks: action.payload };
});

MAP.set(StateActions.SET_WORKS, (state: State, action: Action<MongoDocument<Work>[]>) => {
  if (!action.payload) return state;

  return { ...state, works: action.payload };
});

// to revise

MAP.set(StateActions.ADD_SPRINT, (state: State, action: Action<MongoDocument<Sprint<Dayjs>>>) => {
  if (!action.payload) return state;

  return { ...state, sprints: [...state.sprints, action.payload] };
});

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

MAP.set(StateActions.ADD_ENGINEER, (state: State, action: Action<string>) => {
  if (!action.payload) return state;

  return assoc('addedEngineers', [...state.addedEngineers, action.payload], state);
});

MAP.set(StateActions.ADD_WORK, (state: State, action: Action<MongoDocument<Work>>) => {
  if (!action.payload) return state;

  return assoc('works', [...state.works, action.payload], state);
});

MAP.set(StateActions.ASSIGN_WORK, (state: State, action: Action<MongoDocument<AssignedWork>>) => {
  if (!action.payload) return state;

  return assoc('assignedWorks', [...state.assignedWorks, action.payload], state);
});

MAP.set(StateActions.UNASSIGN_WORK, (state: State, action: Action<string>) => {
  // eslint-disable-next-line no-console
  console.log('hi', action);

  if (!action.payload) return state;

  return assoc(
    'assignedWorks',
    state.assignedWorks.filter(work => work.workId !== action.payload),
    state,
  );
});

MAP.set(
  StateActions.UPDATE_ENGINEER_DAYS_OFF,
  (state: State, action: Action<{ engineerId: string; days: Dayjs[] }>) => {
    const { payload } = action;

    if (!payload) return state;

    return assoc(
      'engineers',
      state.engineers.map(engineer => {
        if (engineer._id === payload.engineerId) return assoc('daysOff', payload.days, engineer);

        return engineer;
      }),
      state,
    );
  },
);
