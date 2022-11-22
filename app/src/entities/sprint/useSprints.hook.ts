import { AnyValue, R, RecordObject } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { AppContext, sprintDateToDayjs, sprintDateToDayjsArray } from '..';
import { DbSprint } from '../../shared';
import { setMessage, setIsLoading, setSprints, useDispatch, useSelector, addSprint } from '../../state';

export function useSprints() {
  const { query, getMessage } = useContextSelector(AppContext, c => R.pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const updateIsLoading = (item: string, status = false) => R.compose(dispatch, setIsLoading)([item, status]);

  function handleAddPositive(data: DbSprint<string>) {
    R.compose(dispatch, addSprint, sprintDateToDayjs)(data);
    updateIsLoading('add-sprint');
  }

  function handleAddNegative(message: string) {
    R.compose(dispatch, setMessage)(message);
    updateIsLoading('add-sprint');
  }

  function add(data: RecordObject<AnyValue>) {
    updateIsLoading('add-sprint', true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbSprint<string>>('sprint', 'add', data)
      .then(r => (r.isOK ? handleAddPositive(r.payload) : handleAddNegative(r.message)))
      .catch(err => handleAddNegative(err.message));
  }

  function handleGetPositive(data: DbSprint<string>[]) {
    R.compose(dispatch, setSprints, sprintDateToDayjsArray)(data);
    updateIsLoading('get-sprint');
  }

  function handleGetNegative(message: string) {
    R.compose(dispatch, setMessage)(message);
    updateIsLoading('get-sprint');
  }

  function get() {
    updateIsLoading('get-sprint', true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbSprint<string>[]>('sprint', 'getAll')
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

  return { add, get, update, remove };
}
