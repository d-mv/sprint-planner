import { compose } from 'ramda';

import { getMessage, setAddedEngineers, setIsLoading, setMessage, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useApp() {
  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handleGetAddedEngineersPositive(data: string[]) {
    compose(dispatch, setAddedEngineers)(data);
    compose(dispatch, setIsLoading)(['get-added-engineers', false]);
  }

  function handleGetAddedEngineersNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['get-added-engineers', false]);
  }

  function getAddedEngineers() {
    compose(dispatch, setIsLoading)(['get-added-engineers', true]);

    if (error) compose(dispatch, setMessage)('');

    query<string[]>('app', 'getAddedEngineers')
      .then(r => (r.isOK ? handleGetAddedEngineersPositive(r.payload) : handleGetAddedEngineersNegative(r.message)))
      .catch(err => handleGetAddedEngineersNegative(err.message));
  }

  return { getAddedEngineers };
}
