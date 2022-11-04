import { useEffect } from 'react';
import { useLogin } from '../adaptors';
import { CONFIG } from '../config';

import { Login, Main } from '../pages';
import { getIsConnected, StateActions, useDispatch, useSelector } from '../state';
import { ifTrue } from '../tools';

export function App() {
  const dispatch = useDispatch();

  const isConnected = useSelector(getIsConnected);

  const { request } = useLogin();

  useEffect(() => {
    dispatch({ type: StateActions.BOOT });

    if (CONFIG.mongoDb) request(CONFIG.mongoDb);
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
