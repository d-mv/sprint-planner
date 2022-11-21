import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, assignedWorkDayToDayjs } from '..';
import { AnyValue, RecordObject, DbAssignedWork, useCommon, DbWork } from '../../shared';
import {
  setMessage,
  setWorks,
  useDispatch,
  useSelector,
  addWork,
  addAssignedWork,
  updateWork,
  updateAssignedWork,
} from '../../state';

export function useWorks() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  type MixedAddResult = { work: DbWork; assignedWork: DbAssignedWork<string> };

  function handleAddPositive(data: DbWork): void;
  function handleAddPositive(data: MixedAddResult, withAssign: boolean, callback?: () => void): void;

  function handleAddPositive(data: DbWork | MixedAddResult, withAssign = false, callback?: () => void) {
    if (!withAssign) {
      compose(dispatch, addWork)(data as DbWork);
    } else if ('work' in data && 'assignedWork' in data) {
      compose(dispatch, addWork)(data.work);
      compose(dispatch, addAssignedWork, assignedWorkDayToDayjs)(data.assignedWork);
    }

    updateIsLoading('add-work');

    if (callback) callback();
  }

  function add(
    work: RecordObject<AnyValue>,
    assign?: { engineerId: string; startDate: string },
    callback?: () => void,
  ) {
    const item = 'add-work';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query('work', 'add', { work, assign })
      .then(r => {
        return r.isOK ? handleAddPositive(r.payload, !!assign, callback) : handleNegative(r.message, item);
      })
      .catch(err => handleNegative(err.message, item));
  }

  function get() {
    const item = 'get-works';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<DbWork[]>('work', 'getAll')
      .then(r => (r.isOK ? handlePositive(r.payload, setWorks, item) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function handleUpdatePositive(data: MixedAddResult, callback: () => void) {
    compose(dispatch, updateWork)(data.work);
    compose(dispatch, updateAssignedWork, assignedWorkDayToDayjs)(data.assignedWork);

    updateIsLoading('update-work');
    callback();
  }

  function update(data: RecordObject<AnyValue>, callback: () => void) {
    const item = 'update-work';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<MixedAddResult>('work', 'update', data)
      .then(r => (r.isOK ? handleUpdatePositive(r.payload, callback) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { add, get, update, remove };
}
