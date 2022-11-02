import { map } from 'ramda';

import { Engineer as EngineerType } from '../engineer.models';
import { getAddedEngineers, useSelector } from '../../../state';
import { Engineer } from '../Engineer';
import { AddOrCreateEngineer } from '../AddOrCreateEngineer';
import classes from './Engineers.module.scss';
import { UnAssignedWorks } from '../../work';
import clsx from 'clsx';

export function Engineers() {
  const engineers = useSelector(getAddedEngineers);

  function renderEngineer(engineer: EngineerType) {
    return <Engineer key={engineer.id} engineer={engineer} />;
  }

  return (
    <div className={classes.container}>
      {map(renderEngineer, engineers)}
      <div className={clsx('column', classes.left)}>
        <AddOrCreateEngineer />
        <UnAssignedWorks />
      </div>
    </div>
  );
}
