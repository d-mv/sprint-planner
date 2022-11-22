import { R } from '@mv-d/toolbelt';

import { useDispatch, setIsLoading, setMessage, Action, LoadingActions } from '../../state';

export function useCommon() {
  const dispatch = useDispatch();

  const updateIsLoading = (item: string, status = false) => R.compose(dispatch, setIsLoading)([item, status]);

  function handleNegative(message: string, item: string) {
    R.compose(dispatch, setMessage)(message);
    updateIsLoading(item);
  }

  function handlePositive<T>(
    data: T,
    actionFn: (arg0: T) => Action<T>,
    process: string | LoadingActions,
    callback?: () => void,
  ) {
    R.compose(dispatch, actionFn)(data);
    updateIsLoading(process);

    if (callback) callback();
  }

  return { updateIsLoading, handleNegative, handlePositive };
}
