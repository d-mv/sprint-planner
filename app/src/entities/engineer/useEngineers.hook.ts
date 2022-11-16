import { compose, pick } from 'ramda';

import { AppContext, Engineer, engineerDaysOffToDayjs } from '..';
import { MongoDocument } from '../../shared';
import { setMessage, setEngineers, setIsLoading, useDispatch, useSelector, updateEngineer } from '../../state';
import { useContextSelector } from 'use-context-selector';

export function useEngineers() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  function handleGetPositive(data: MongoDocument<Engineer<string>>[]) {
    compose(dispatch, setEngineers, engineerDaysOffToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-engineers', false]);
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['get-engineers', false]);
  }

  function create() {
    // eslint-disable-next-line no-console
    console.log('create');
  }

  function get() {
    compose(dispatch, setIsLoading)(['get-engineers', true]);

    if (error) compose(dispatch, setMessage)('');

    query<MongoDocument<Engineer<string>>[]>('engineer', 'getAll')
      .then(r => (r.isOK ? handleGetPositive(r.payload) : handleGetNegative(r.message)))
      .catch(err => handleGetNegative(err.message));
  }

  function handleUpdatePositive(data: Partial<MongoDocument<Engineer>>) {
    compose(dispatch, updateEngineer)(data);
    compose(dispatch, setIsLoading)(['update-engineer', false]);
  }

  function handleUpdateNegative(message: string) {
    compose(dispatch, setMessage)(message);
    compose(dispatch, setIsLoading)(['update-engineer', false]);
  }

  function update(data: Partial<MongoDocument<Engineer>>) {
    compose(dispatch, setIsLoading)(['update-engineer', true]);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('engineer', 'update', data)
      .then(r => (r.isOK ? handleUpdatePositive(data) : handleUpdateNegative(r.message)))
      .catch(err => handleUpdateNegative(err.message));
  }

  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { create, get, update, remove };
}
