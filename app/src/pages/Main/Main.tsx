import clsx from 'clsx';

import { SprintHeader, Sprints, Engineers } from '../../entities';
import classes from './Main.module.scss';

export function Main() {
  return (
    <div className={clsx('column', classes.container)}>
      <SprintHeader />
      <div className='line width-fit'>
        <div className={classes['eng-header']}>left</div>
        <Sprints />
      </div>
      <Engineers />
    </div>
  );
}
