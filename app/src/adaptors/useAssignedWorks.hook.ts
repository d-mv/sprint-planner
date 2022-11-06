import { compose } from 'ramda';
import { AssignedWork, assignedWorksDayToDayjs } from '../entities';
import { MongoDocument } from '../models';
import { getAuthError, setAssignedWork, setAuthError, setIsLoading, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useAssignedWork() {
  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  function handleGetPositive(data: MongoDocument<AssignedWork<string>>[]) {
    compose(dispatch, setAssignedWork, assignedWorksDayToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-assigned-work', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setAuthError)(message);
    compose(dispatch, setIsLoading)(['get-assigned-work', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-assigned-work', true]);

    if (error) compose(dispatch, setAuthError)('');

    query<MongoDocument<AssignedWork<string>>[]>('assigned_work', 'getAll')
      .then(r => (r.isOK ? handleGetPositive(r.payload) : handleGetNegative(r.message)))
      .catch(err => handleGetNegative(err.message));
  }

  function update() {
    // eslint-disable-next-line no-console
    console.log('update');
  }

  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { create, get, update, remove };
}
