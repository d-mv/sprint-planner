import { useEffect } from 'react';

import { Login, Main } from '../pages';
import { getIsConnected, StateActions, useDispatch, useSelector } from '../state';
import { ifTrue } from '../tools';

export function App() {
  const dispatch = useDispatch();

  const isConnected = useSelector(getIsConnected);

  useEffect(() => {
    dispatch({ type: StateActions.BOOT });
  }, []);

  const renderLogin = () => <Login />;

  const renderMain = () => <Main />;

  return (
    <>
      {ifTrue(isConnected, renderMain)}
      {ifTrue(!isConnected, renderLogin)}
    </>
  );
}
