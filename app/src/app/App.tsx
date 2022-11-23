import { useEffect } from 'react';
import { ifTrue } from '@mv-d/toolbelt';

import { CONFIG, LazyLoad } from '../shared';
import { useLogin } from '../entities';
import { Loading, Login, Main } from '../pages';
import { getIsConnected, StateActions, useDispatch, useSelector } from '../state';

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
      <LazyLoad>
        {ifTrue(isConnected, renderMain)}
        {ifTrue(!isConnected, renderLogin)}
        <Loading />
      </LazyLoad>
    </>
  );
}
