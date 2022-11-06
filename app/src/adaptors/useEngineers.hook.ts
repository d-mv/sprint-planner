import { compose } from 'ramda';
import { Engineer, engineerDaysOffToDayjs } from '../entities';
import { MongoDocument } from '../models';
import { getAuthError, setAuthError, setEngineers, setIsLoading, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useEngineers() {
  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  function handleGetPositive(data: MongoDocument<Engineer<string>>[]) {
    compose(dispatch, setEngineers, engineerDaysOffToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-engineers', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setAuthError)(message);
    compose(dispatch, setIsLoading)(['get-engineers', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-engineers', true]);

    if (error) compose(dispatch, setAuthError)('');

    query<MongoDocument<Engineer<string>>[]>('engineer', 'getAll')
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
