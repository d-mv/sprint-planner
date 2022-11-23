import { R } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { AppContext, AssignedWork, assignedWorkDayToDayjs, assignedWorksDayToDayjs } from '..';
import { DbAssignedWork, useCommon } from '../../shared';
import {
  setAssignedWorks,
  setMessage,
  useDispatch,
  useSelector,
  removeAssignedWork,
  addAssignedWork,
} from '../../state';

export function useAssignedWork() {
  const { query, getMessage } = useContextSelector(AppContext, c => R.pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  function add(data: Partial<AssignedWork>, callback: () => void) {
    const item = 'add-assigned-work';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbAssignedWork<string>>('assigned_work', 'add', data)
      .then(r =>
        r.isOK
          ? handlePositive(assignedWorkDayToDayjs(r.payload), addAssignedWork, item, callback)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function get() {
    const item = 'get-assigned-work';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbAssignedWork<string>[]>('assigned_work', 'getAll')
      .then(r =>
        r.isOK
          ? handlePositive(assignedWorksDayToDayjs(r.payload), setAssignedWorks, item)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function remove(assignedWorkId: string) {
    const item = 'remove-assigned-work';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<'OK'>('assigned_work', 'delete', assignedWorkId)
      .then(r => (r.isOK ? handlePositive(assignedWorkId, removeAssignedWork, item) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  return { add, get, remove };
}
