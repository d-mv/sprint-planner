import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, Sprint, sprintDateToDayjs } from '..';
import { MongoDocument } from '../../models';
import { setMessage, setIsLoading, setSprints, useDispatch, useSelector } from '../../state';

export function useSprints() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

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
