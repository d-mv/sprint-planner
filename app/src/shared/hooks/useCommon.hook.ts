import { compose } from 'ramda';

import { useDispatch, setIsLoading, setMessage } from '../../state';

export function useCommon() {
  const dispatch = useDispatch();

  const updateIsLoading = (item: string, status = false) => compose(dispatch, setIsLoading)([item, status]);

  function handleNegative(message: string, item: string) {
    compose(dispatch, setMessage)(message);
    updateIsLoading(item);
  }

  return { updateIsLoading, handleNegative };
}
