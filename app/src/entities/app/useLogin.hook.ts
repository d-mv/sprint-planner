import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';
import { useCommon } from '../../shared';

import { setMessage, setIsConnected, useDispatch, useSelector } from '../../state';
import { AppContext } from './app.contexts';

export function useLogin() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  function connect(url: string) {
    const item = 'login';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('auth', 'connect', url)
      .then(r => (r.isOK ? handlePositive(true, setIsConnected, item) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function disconnect() {
    const item = 'logout';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('auth', 'disconnect')
      .then(r => (r.isOK ? handlePositive(false, setIsConnected, item) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  return { connect, disconnect };
}
