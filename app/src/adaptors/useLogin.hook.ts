import { compose } from 'ramda';

import { getAuthError, setAuthError, setIsConnected, setIsLoading, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useLogin() {
  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  function handlePositive() {
    compose(dispatch, setIsConnected)(true);
    compose(dispatch, setIsLoading)(['login', false]);
  }

  function handleNegative(message: string) {
    compose(dispatch, setAuthError)(message);
    compose(dispatch, setIsLoading)(['login', false]);
  }

  function request(url: string) {
    compose(dispatch, setIsLoading)(['login', true]);

    compose(dispatch, setAuthError)('');

    query<'OK'>('auth', 'connect', url)
      .then(r => (r.isOK ? handlePositive() : handleNegative(r.message)))
      .catch(err => handleNegative(err.message));
  }

  return { request };
}
