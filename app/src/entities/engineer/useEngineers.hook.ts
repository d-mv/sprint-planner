import { compose, pick } from 'ramda';

import { AppContext, Engineer, engineerDaysOffToDayjs, engineersDaysOffToDayjs } from '..';
import { AnyValue, DbEngineer, MongoDocument, RecordObject, useCommon } from '../../shared';
import {
  setMessage,
  setEngineers,
  setIsLoading,
  useDispatch,
  useSelector,
  updateEngineer,
  addEngineer,
} from '../../state';
import { useContextSelector } from 'use-context-selector';

export function useEngineers() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const { updateIsLoading, handleNegative } = useCommon();

  const error = useSelector(getMessage);

  function handleAddPositive(data: DbEngineer<string>) {
    compose(dispatch, addEngineer, engineerDaysOffToDayjs)(data);
    updateIsLoading('add-engineer');
  }

  function handleGetPositive(data: DbEngineer<string>[]) {
    compose(dispatch, setEngineers, engineersDaysOffToDayjs)(data);
    compose(dispatch, setIsLoading)(['get-engineers', false]);
  }

  function handleUpdatePositive(data: Partial<MongoDocument<Engineer>>) {
    compose(dispatch, updateEngineer)(data);
    compose(dispatch, setIsLoading)(['update-engineer', false]);
  }

  function add(data: RecordObject<AnyValue>) {
    const item = 'add-engineer';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<DbEngineer<string>>('engineer', 'add', data)
      .then(r => (r.isOK ? handleAddPositive(r.payload) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function get() {
    const item = 'get-engineers';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<DbEngineer<string>[]>('engineer', 'getAll')
      .then(r => (r.isOK ? handleGetPositive(r.payload) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function update(data: Partial<MongoDocument<Engineer>>) {
    const item = 'update-engineer';

    updateIsLoading(item, true);

    if (error) compose(dispatch, setMessage)('');

    query<'OK'>('engineer', 'update', data)
      .then(r => (r.isOK ? handleUpdatePositive(data) : handleNegative(r.message, item)))
      .catch(err => handleNegative(err.message, item));
  }

  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { add, get, update, remove };
}
