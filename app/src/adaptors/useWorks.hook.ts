import { compose } from 'ramda';

import { Work } from '../entities';
import { MongoDocument } from '../models';
import { getMessage, setMessage, setIsLoading, setWorks, useDispatch, useSelector } from '../state';
import { query } from './http.adaptor';

export function useWorks() {
  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handleGetPositive(data: MongoDocument<Work>[]) {
    compose(dispatch, setWorks)(data);
    compose(dispatch, setIsLoading)(['get-works', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['get-works', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-works', true]);

    if (error) compose(dispatch, setMessage)('');

    query<MongoDocument<Work>[]>('work', 'getAll')
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
