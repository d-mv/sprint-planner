import { assoc, compose, isEmpty, isNil } from 'ramda';
import { useCallback, useEffect } from 'react';
import { DbScenario, FormScenario, query, RecordObject } from '../../shared';
import { getScenarios, LoadingActions, setIsLoading, setScenarios, useDispatch, useSelector } from '../../state';
import { Result } from '../result';

export function useScenario() {
  const scenarios = useSelector(getScenarios);

  const dispatch = useDispatch();

  const updateIsLoading = useCallback(
    (status = false) => compose(dispatch, setIsLoading)([LoadingActions.GET_SCENARIOS, status]),
    [dispatch],
  );

  const processPositive = useCallback(
    (result: Result<DbScenario[]>) => {
      if (!result.isOK) return;

      const { payload } = result;

      let r: RecordObject<FormScenario> = {};

      payload.forEach(p => {
        r = assoc(p.label, JSON.parse(p.stringified) as FormScenario, r);
      });

      compose(dispatch, setScenarios)(r);
      updateIsLoading();
    },
    [dispatch, updateIsLoading],
  );

  const fetchScenarios = useCallback(() => {
    updateIsLoading(true);
    query<DbScenario[]>('scenario', 'getAll')
      .then(processPositive)
      .catch(err => {
        console.error(err);
        updateIsLoading();
      });
  }, [processPositive]);

  useEffect(() => {
    if (!scenarios || isEmpty(scenarios)) fetchScenarios();
  }, [fetchScenarios, scenarios]);
}
