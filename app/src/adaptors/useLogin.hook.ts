import { compose } from 'ramda';

import { getMessage, setMessage, setIsConnected, setIsLoading, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useLogin() {
  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handlePositive() {
    compose(dispatch, setIsConnected)(true);
    compose(dispatch, setIsLoading)(['login', false]);
  }

  function handleNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['login', false]);
  }

  function request(url: string) {
    compose(dispatch, setIsLoading)(['login', true]);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('auth', 'connect', url)
      .then(r => (r.isOK ? handlePositive() : handleNegative(r.message)))
      .catch(err => handleNegative(err.message));
  }

  return { request };
}
