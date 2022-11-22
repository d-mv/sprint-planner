import { AnyValue, as, axios, Result, R, failure } from '@mv-d/toolbelt';

import { CONFIG } from '../config';
import { Dispatch, unauthorized } from '../../state';

export function setupQuery(dispatch: Dispatch<unknown>) {
  return async function query<T = AnyValue>(domain: string, action: string, payload?: AnyValue) {
    try {
      const r = await axios.default.post<Result<T>>(
        CONFIG.backend,
        { domain, action, payload },
        { headers: { 'x-controller': `${domain}/${action}` } },
      );

      return r.data;
    } catch (err) {
      const error = as<axios.AxiosError>(err);

      // eslint-disable-next-line no-console
      console.log(error);

      if (error.response?.status === 401) {
        R.compose(dispatch, unauthorized)();
        return failure(String(error.response?.data) ?? 'Unauthorized');
      } else return failure(error.message);
    }
  };
}
