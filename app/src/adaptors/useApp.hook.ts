import { compose } from 'ramda';

import { getAuthError, setAddedEngineers, setAuthError, setIsLoading, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useApp() {
  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  function handleGetAddedEngineersPositive(data: string[]) {
    compose(dispatch, setAddedEngineers)(data);
    compose(dispatch, setIsLoading)(['get-Added-engineers', false]);
  }

  function handleGetAddedEngineersNegative(message: string) {
    compose(dispatch, setAuthError)(message);
    compose(dispatch, setIsLoading)(['get-Added-engineers', false]);
  }

  function getAddedEngineers() {
    compose(dispatch, setIsLoading)(['get-Added-engineers', true]);

    if (error) compose(dispatch, setAuthError)('');

    query<string[]>('app', 'getAddedEngineers')
      .then(r => (r.isOK ? handleGetAddedEngineersPositive(r.payload) : handleGetAddedEngineersNegative(r.message)))
      .catch(err => handleGetAddedEngineersNegative(err.message));
  }

  return { getAddedEngineers };
}
