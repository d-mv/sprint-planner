import clsx from 'clsx';
import { useEffect } from 'react';
import { Engineers, SprintHeader, Sprints } from '../entities';
import { StateActions, useDispatch } from '../state';
import classes from './App.module.scss';
export function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: StateActions.BOOT})
  },[])
  return (
    <div className={clsx('column', classes.container)}>
      <SprintHeader />
      <div className='line'>
        <div className={classes['eng-header']}>left</div>
        <Sprints />
      </div>
      <Engineers />
    </div>
  );
}
