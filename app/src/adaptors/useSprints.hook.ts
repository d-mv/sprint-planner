import { compose } from 'ramda';

import { Sprint, sprintDateToDayjs } from '../entities';
import { MongoDocument } from '../models';
import { getMessage, setMessage, setIsLoading, setSprints, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useSprints() {
  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handleGetPositive(data: MongoDocument<Sprint>[]) {
    compose(dispatch, setSprints, sprintDateToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-sprint', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['get-sprint', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-sprint', true]);

    if (error) compose(dispatch, setMessage)('');

    query<MongoDocument<Sprint>[]>('sprint', 'getAll')
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
