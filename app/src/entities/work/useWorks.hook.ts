import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, AssignedWork, assignedWorkDayToDayjs, Work } from '..';
import { MongoDocument } from '../../models';
import { setMessage, setIsLoading, setWorks, useDispatch, useSelector, addWork, addAssignedWork } from '../../state';

export function useWorks() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const updateIsLoading = (item: string, status = false) => compose(dispatch, setIsLoading)([item, status]);

  function handleGetPositive(data: MongoDocument<Work>[]) {
    compose(dispatch, setWorks)(data);
    updateIsLoading('get-works');
  }

  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('get-works');
  }

  type MixedAddResult = { work: MongoDocument<Work>; assignedWork: MongoDocument<AssignedWork<string>> };

  function handleAddPositive(data: MongoDocument<Work>): void;
  function handleAddPositive(data: MixedAddResult, withAssign: boolean): void;

  function handleAddPositive(data: MongoDocument<Work> | MixedAddResult, withAssign = false) {
    if (!withAssign) {
      compose(dispatch, addWork)(data as MongoDocument<Work>);
    } else if ('work' in data && 'assignedWork' in data) {
      compose(dispatch, addWork)(data.work);
      compose(dispatch, addAssignedWork, assignedWorkDayToDayjs)(data.assignedWork);
    }

    updateIsLoading('add-work');
  }

  function handleAddNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('add-work');
  }

  function add(work: Work, assign?: { engineerId: string; startDate: string }) {
    updateIsLoading('add-work', true);

    if (error) compose(dispatch, setMessage)('');

    query('work', 'add', { work, assign })
      .then(r => {
        r.isOK ? handleAddPositive(r.payload, !!assign) : handleAddNegative(r.message);
      })
      .catch(err => handleAddNegative(err.message));
  }

  function get() {
    updateIsLoading('get-works', true);

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

  return { add, get, update, remove };
}
