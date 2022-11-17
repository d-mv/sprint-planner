import dayjs from 'dayjs';
import { compose } from 'ramda';
import { format } from '../lib';
import { add } from '../lib/form/tools';
import { Option } from '../models';

export function checkIfAddDays(value: Option<string>): Option<string> {
  const plus = value?.match(/\+/);

  if (plus && plus[0] === '+') {
    const n = parseInt(value?.replace(/\+/, '') ?? '0');

    return compose(format, add(n, 'days'))(dayjs());
  }

  return undefined;
}
