import { AnyValue, R, RecordObject } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { AppContext, sprintDateToDayjs, sprintDateToDayjsArray } from '..';
import { DbSprint, useCommon } from '../../shared';
import { setMessage, setSprints, useDispatch, useSelector, addSprint } from '../../state';

export function useSprints() {
  const { query, getMessage } = useContextSelector(AppContext, c => R.pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const error = useSelector(getMessage);

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  function add(data: RecordObject<AnyValue>, callback: () => void) {
    const item = 'add-sprint';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbSprint<string>>('sprint', 'add', data)
      .then(r =>
        r.isOK
          ? handlePositive(sprintDateToDayjs(r.payload), addSprint, item, callback)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function get() {
    const item = 'get-sprint';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbSprint<string>[]>('sprint', 'getAll')
      .then(r =>
        r.isOK ? handlePositive(sprintDateToDayjsArray(r.payload), setSprints, item) : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
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
