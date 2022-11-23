import { logger, R, RecordObject, Result } from '@mv-d/toolbelt';
import { useCallback, useEffect } from 'react';

import { DbScenario, FormScenario, setupQuery } from '../../shared';
import { getScenarios, LoadingActions, setIsLoading, setScenarios, useDispatch, useSelector } from '../../state';

export function useScenario() {
  const scenarios = useSelector(getScenarios);

  const dispatch = useDispatch();

  const query = setupQuery(dispatch);

  const updateIsLoading = useCallback(
    (status = false) => R.compose(dispatch, setIsLoading)([LoadingActions.GET_SCENARIOS, status]),
    [dispatch],
  );

  const processPositive = useCallback(
    (result: Result<DbScenario[]>) => {
      if (!result.isOK) return;

      const { payload } = result;

      let r: RecordObject<FormScenario> = {};

      payload.forEach(p => {
        r = R.assoc(p.label, JSON.parse(p.stringified) as FormScenario, r);
      });

      R.compose(dispatch, setScenarios)(r);
      updateIsLoading();
    },
    [dispatch, updateIsLoading],
  );

  const fetchScenarios = useCallback(() => {
    updateIsLoading(true);
    query<DbScenario[]>('scenario', 'getAll')
      .then(processPositive)
      .catch(err => {
        logger.error(err);
        updateIsLoading();
      });
  }, [processPositive]);

  useEffect(() => {
    if (!scenarios || R.isEmpty(scenarios)) fetchScenarios();
  }, [fetchScenarios, scenarios]);
}
