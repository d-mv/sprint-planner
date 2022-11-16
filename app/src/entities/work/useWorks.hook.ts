import { compose, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { AppContext, AssignedWork, assignedWorkDayToDayjs, Work } from '..';
import { AnyValue, MongoDocument, RecordObject } from '../../models';
import {
  setMessage,
  setIsLoading,
  setWorks,
  useDispatch,
  useSelector,
  addWork,
  addAssignedWork,
  updateWork,
  updateAssignedWork,
} from '../../state';

/**
 *
 */
export function useWorks() {
  const { query, getMessage } = useContextSelector(AppContext, c => pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const updateIsLoading = (item: string, status = false) => compose(dispatch, setIsLoading)([item, status]);

  /**
   *
   * @param data
   */
  function handleGetPositive(data: MongoDocument<Work>[]) {
    compose(dispatch, setWorks)(data);
    updateIsLoading('get-works');
  }

  /**
   *
   * @param message
   */
  function handleGetNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('get-works');
  }

  type MixedAddResult = { work: MongoDocument<Work>; assignedWork: MongoDocument<AssignedWork<string>> };

  function handleAddPositive(data: MongoDocument<Work>): void;
  function handleAddPositive(data: MixedAddResult, withAssign: boolean): void;

  /**
   *
   * @param data
   * @param withAssign
   */
  function handleAddPositive(data: MongoDocument<Work> | MixedAddResult, withAssign = false) {
    if (!withAssign) {
      compose(dispatch, addWork)(data as MongoDocument<Work>);
    } else if ('work' in data && 'assignedWork' in data) {
      compose(dispatch, addWork)(data.work);
      compose(dispatch, addAssignedWork, assignedWorkDayToDayjs)(data.assignedWork);
    }

    updateIsLoading('add-work');
  }

  /**
   *
   * @param message
   */
  function handleAddNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('add-work');
  }

  /**
   *
   * @param work
   * @param assign
   * @param assign.engineerId
   * @param assign.startDate
   */
  function add(work: RecordObject<AnyValue>, assign?: { engineerId: string; startDate: string }) {
    updateIsLoading('add-work', true);

    if (error) compose(dispatch, setMessage)('');

    query('work', 'add', { work, assign })
      .then(r => {
        return r.isOK ? handleAddPositive(r.payload, !!assign) : handleAddNegative(r.message);
      })
      .catch(err => handleAddNegative(err.message));
  }

  /**
   *
   */
  function get() {
    updateIsLoading('get-works', true);

    if (error) compose(dispatch, setMessage)('');

    query<MongoDocument<Work>[]>('work', 'getAll')
      .then(r => (r.isOK ? handleGetPositive(r.payload) : handleGetNegative(r.message)))
      .catch(err => handleGetNegative(err.message));
  }

  /**
   *
   * @param data
   */
  function handleUpdatePositive(data: MixedAddResult) {
    compose(dispatch, updateWork)(data.work);
    compose(dispatch, updateAssignedWork, assignedWorkDayToDayjs)(data.assignedWork);

    updateIsLoading('update-work');
  }

  /**
   *
   * @param message
   */
  function handleUpdateNegative(message: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading('update-work');
  }

  /**
   *
   * @param data
   */
  function update(data: RecordObject<AnyValue>) {
    updateIsLoading('update-work', true);

    if (error) compose(dispatch, setMessage)('');

    query<MixedAddResult>('work', 'update', data)
      .then(r => (r.isOK ? handleUpdatePositive(r.payload) : handleUpdateNegative(r.message)))
      .catch(err => handleUpdateNegative(err.message));
  }

  /**
   *
   */
  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { add, get, update, remove };
}
