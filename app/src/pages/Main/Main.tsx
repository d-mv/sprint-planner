import clsx from 'clsx';

import { SprintHeader, Sprints, Engineers } from '../../entities';
import classes from './Main.module.scss';

export function Main() {
  return (
    <div className={clsx('column', classes.container)}>
      <SprintHeader />
      <div className={clsx('line', classes.sprints)}>
        <Engineers />
        <Sprints />
      </div>
    </div>
  );
}
