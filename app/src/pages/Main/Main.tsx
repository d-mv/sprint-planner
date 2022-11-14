import clsx from 'clsx';
import { LoadingIndication } from '../../shared';

import { SprintHeader, Sprints, Engineers } from '../../entities';
import classes from './Main.module.scss';

export function Main() {
  return (
    <div className={clsx('column w-100 h-100', classes.container)}>
      <div className='line s-between'>
        <SprintHeader />
        <LoadingIndication />
      </div>
      <main className={clsx('line w-100', classes.sprints)}>
        <Engineers />
        <Sprints />
      </main>
    </div>
  );
}
