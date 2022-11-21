import { useEffect } from 'react';

import { CONFIG } from '../shared';
import { useLogin } from '../entities';
import { Loading, Login, Main } from '../pages';
import { getIsConnected, StateActions, useDispatch, useSelector } from '../state';
import { ifTrue } from '../shared/tools/logic.tools';

export function App() {
  const dispatch = useDispatch();

  const isConnected = useSelector(getIsConnected);

  const { connect } = useLogin();

  useEffect(() => {
    dispatch({ type: StateActions.BOOT });

    if (CONFIG.mongoDb) connect(CONFIG.mongoDb);
  }, []);

  const renderLogin = () => <Login />;

  const renderMain = () => <Main />;

  return (
    <>
      {ifTrue(isConnected, renderMain)}
      {ifTrue(!isConnected, renderLogin)}
      <Loading />
    </>
  );
}
