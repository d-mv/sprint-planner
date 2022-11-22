import axios, { AxiosError } from 'axios';

import { CONFIG } from '../config';
import { failure, Result } from '../../entities';

import { AnyValue } from '..';
import { as } from '../tools/type.tools';
import { Dispatch, unauthorized } from '../../state';
import { compose } from 'ramda';

export function setupQuery(dispatch: Dispatch<unknown>) {
  return async function query<T = AnyValue>(domain: string, action: string, payload?: AnyValue) {
    try {
      const r = await axios.post<Result<T>>(CONFIG.backend, { domain, action, payload });

      return r.data;
    } catch (err) {
      const error = as<AxiosError>(err);

      // eslint-disable-next-line no-console
      console.log(error);

      if (error.response?.status === 401) {
        compose(dispatch, unauthorized)();
        return failure(String(error.response?.data) ?? 'Unauthorized');
      } else return failure(error.message);
    }
  };
}
