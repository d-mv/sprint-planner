import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, AssignedWork, assignedWorkDayToDayjs, assignedWorksDayToDayjs } from '..';
import { DbAssignedWork } from '../../shared';
import {
  setAssignedWorks,
  setMessage,
  setIsLoading,
  useDispatch,
  useSelector,
  removeAssignedWork,
  addAssignedWork,
} from '../../state';

export function useAssignedWork() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handleGetPositive(data: DbAssignedWork<string>[]) {
    compose(dispatch, setAssignedWorks, assignedWorksDayToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-assigned-work', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['get-assigned-work', false]);
  }

  function handleAddPositive(data: DbAssignedWork<string>) {
    compose(dispatch, addAssignedWork, assignedWorkDayToDayjs)(data);
    compose(dispatch, setIsLoading)(['add-assigned-work', false]);
  }

  function handleAddNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['add-assigned-work', false]);
  }

  function add(data: Partial<AssignedWork>) {
    compose(dispatch, setIsLoading)(['add-assigned-work', true]);

    if (error) compose(dispatch, setMessage)('');

    query<DbAssignedWork<string>>('assigned_work', 'add', data)
      .then(r => (r.isOK ? handleAddPositive(r.payload) : handleAddNegative(r.message)))
      .catch(err => handleAddNegative(err.message));
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-assigned-work', true]);

    if (error) compose(dispatch, setMessage)('');

    query<DbAssignedWork<string>[]>('assigned_work', 'getAll')
      .then(r => (r.isOK ? handleGetPositive(r.payload) : handleGetNegative(r.message)))
      .catch(err => handleGetNegative(err.message));
  }

  function update() {
    // eslint-disable-next-line no-console
    console.log('update');
  }

  function handleRemovePositive(data: string) {
    compose(dispatch, removeAssignedWork)(data);
    compose(dispatch, setIsLoading)(['remove-assigned-work', false]);
  }

  function handleRemoveNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['remove-assigned-work', false]);
  }

  function remove(assignedWorkId: string) {
    compose(dispatch, setIsLoading)(['remove-assigned-work', true]);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('assigned_work', 'delete', assignedWorkId)
      .then(r => (r.isOK ? handleRemovePositive(assignedWorkId) : handleRemoveNegative(r.message)))
      .catch(err => handleRemoveNegative(err.message));
  }

  return { add, get, update, remove };
}
