import { assoc } from 'ramda';

import { AnyValue } from '../../models';

export let STATE = {
  isConnectedToDb: false,
};

const get = (key: keyof typeof STATE) => STATE[key];

const set = (key: keyof typeof STATE, value: AnyValue) => {
  STATE = assoc(key, value, STATE);
  return STATE;
};

export { get, set };
