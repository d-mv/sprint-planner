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

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  function getAssignedEngineers() {
    const item = LoadingActions.GET_ASSIGNED_ENGINEERS;

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<string[]>('app', 'getAssignedEngineers')
      .then(r => (r.isOK ? handlePositive(r.payload, setAssignedEngineers, item) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function assignEngineer(data: string, callback: () => void) {
    const item = 'assign-engineer';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<string[]>('app', 'assignEngineer', data)
      .then(r =>
        r.isOK ? handlePositive(data, assignEngineerAction, item, callback) : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  return { getAssignedEngineers, assignEngineer };
}
