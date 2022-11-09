import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { setMessage, setIsConnected, setIsLoading, useDispatch, useSelector } from '../../state';
import { AppContext } from './app.contexts';

export function useLogin() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

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
