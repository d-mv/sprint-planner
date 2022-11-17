import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, Sprint, sprintDateToDayjs, sprintDateToDayjsArray } from '..';
import { AnyValue, MongoDocument, RecordObject } from '../../shared';
import { setMessage, setIsLoading, setSprints, useDispatch, useSelector, addSprint } from '../../state';

export function useSprints() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const updateIsLoading = (item: string, status = false) => compose(dispatch, setIsLoading)([item, status]);

  function handleAddPositive(data: MongoDocument<Sprint>) {
    compose(dispatch, addSprint, sprintDateToDayjs)(data);
    updateIsLoading('add-sprint');
  }

  function handleAddNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('add-sprint');
  }

  function add(data: RecordObject<AnyValue>) {
    updateIsLoading('add-sprint', true);

    if (error) compose(dispatch, setMessage)('');

    query<MongoDocument<Sprint>>('sprint', 'add', data)
      .then(r => (r.isOK ? handleAddPositive(r.payload) : handleAddNegative(r.message)))
      .catch(err => handleAddNegative(err.message));
  }

  function handleGetPositive(data: MongoDocument<Sprint>[]) {
    compose(dispatch, setSprints, sprintDateToDayjsArray)(data);
    updateIsLoading('get-sprint');
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('get-sprint');
  }

  function get() {
    updateIsLoading('get-sprint', true);

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

  return { add, get, update, remove };
}
