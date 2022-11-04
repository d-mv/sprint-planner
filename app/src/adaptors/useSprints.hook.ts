import { compose } from 'ramda';
import { Sprint, sprintDateToDayjs } from '../entities';
import { MongoDocument } from '../models';
import { getAuthError, setAuthError, setIsLoading, setSprints, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useSprints() {
  const dispatch = useDispatch();

  const error = useSelector(getAuthError);

  function handleGetPositive(data: MongoDocument<Sprint>[]) {
    compose(dispatch, setSprints, sprintDateToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-sprint', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setAuthError)(message);
    compose(dispatch, setIsLoading)(['get-sprint', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-sprint', true]);

    if (error) compose(dispatch, setAuthError)('');

    query<MongoDocument<Sprint>[]>('sprint', 'getAll')
      .then(r => {
        // eslint-disable-next-line no-console
        console.log(r);

        r.isOK ? handleGetPositive(r.payload) : handleGetNegative(r.message);
      })
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
