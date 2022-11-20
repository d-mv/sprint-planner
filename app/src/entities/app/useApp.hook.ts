import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext } from '..';
import { useCommon } from '../../shared';
import {
  LoadingActions,
  setAssignedEngineers,
  assignEngineer as assignEngineerAction,
  setMessage,
  useDispatch,
  useSelector,
} from '../../state';

export function useApp() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const { updateIsLoading, handleNegative } = useCommon();

  function handleGetAddedEngineersPositive(data: string[]) {
    compose(dispatch, setAssignedEngineers)(data);
    updateIsLoading(LoadingActions.GET_ASSIGNED_ENGINEERS);
  }

  function handleAssignEngineersPositive(data: string) {
    compose(dispatch, assignEngineerAction)(data);
    updateIsLoading('assign-engineer');
  }

  function getAssignedEngineers() {
    const item = LoadingActions.GET_ASSIGNED_ENGINEERS;

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<string[]>('app', 'getAssignedEngineers')
      .then(r => (r.isOK ? handleGetAddedEngineersPositive(r.payload) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function assignEngineer(data: string) {
    const item = 'assign-engineer';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<string[]>('app', 'assignEngineer', data)
      .then(r => (r.isOK ? handleAssignEngineersPositive(data) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  return { getAssignedEngineers, assignEngineer };
}
