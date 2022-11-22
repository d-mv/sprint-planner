import { deepEqual } from '@mv-d/toolbelt';

import { State, Action } from '.';
import { CONFIG } from '../shared';
import { MAP } from './map';

function stateLogger(state: State, action: Action, nextState: State) {
  if (!CONFIG.isDev) return;

  const { groupCollapsed, groupEnd, info, log } = console;

  groupCollapsed('%c[ACTION]', 'background-color: lemonchiffon;padding: 2px 8px', action.type);
  log('%c[previous state]', 'color:green', state);
  info('%c[action]', 'color:blue;font-style: italic', action);
  log('%c[next state]', 'color:green', nextState);
  groupEnd();
}

export function reducer(state: State, action: Action) {
  const fn = MAP.get(action.type);

  let nextState = state;

  if (fn) {
    const result = fn(state, action);

    if (!deepEqual(result, state)) {
      nextState = result;

      stateLogger(state, action, nextState);
    }
  }

  return nextState;
}
