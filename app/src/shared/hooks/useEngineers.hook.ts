import { RecordObject, AnyValue, R } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { DbEngineer, useCommon } from '..';
import { AppContext } from '../../entities/app/app.contexts';
import { setMessage, setEngineers, useDispatch, useSelector, updateEngineer, addEngineer } from '../../state';
import { engineerDaysOffToDayjs, engineersDaysOffToDayjs } from '../tools/days.tools';

export function useEngineers() {
  const { query, getMessage } = useContextSelector(AppContext, c => R.pick(['query', 'getMessage'], c));

  const dispatch = useDispatch();

  const { updateIsLoading, handleNegative, handlePositive } = useCommon();

  const error = useSelector(getMessage);

  function add(data: RecordObject<AnyValue>, callback: () => void) {
    const item = 'add-engineer';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbEngineer<string>>('engineer', 'add', data)
      .then(r =>
        r.isOK
          ? handlePositive(engineerDaysOffToDayjs(r.payload), addEngineer, item, callback)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function get() {
    const item = 'get-engineers';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbEngineer<string>[]>('engineer', 'getAll')
      .then(r =>
        r.isOK
          ? handlePositive(engineersDaysOffToDayjs(r.payload), setEngineers, item)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function update(data: RecordObject<AnyValue>, callback: () => void) {
    const item = 'update-engineer';

    updateIsLoading(item, true);

    if (error) R.compose(dispatch, setMessage)('');

    query<DbEngineer<string>>('engineer', 'update', data)
      .then(r =>
        r.isOK
          ? handlePositive(engineerDaysOffToDayjs(r.payload), updateEngineer, item, callback)
          : handleNegative(r.message, item),
      )
      .catch(err => handleNegative(err.message, item));
  }

  function remove() {
    // eslint-disable-next-line no-console
    console.log('remove');
  }

  return { add, get, update, remove };
}
