import { map } from 'ramda';

import { Engineer as EngineerType } from '../engineer.models';
import { getAddedEngineers, useSelector } from '../../../state';
import { Engineer } from '../Engineer';
import { AddOrCreateEngineer } from '../AddOrCreateEngineer';
import classes from './Engineers.module.scss';
import { UnAssignedWorks } from '../../work';
import clsx from 'clsx';
import { useApp, useEngineers, useWorks } from '../../../adaptors';
import { useEffect } from 'react';
import { MongoDocument } from '../../../models';
import { useAssignedWork } from '../../../adaptors/useAssignedWorks.hook';
import { CONSTANTS } from '../../../theme';

export function Engineers() {
  const engineers = useSelector(getAddedEngineers);

  const { get } = useEngineers();

  const app = useApp();

  const works = useWorks();

  const assignedWork = useAssignedWork();

  useEffect(() => {
    get();
    app.getAddedEngineers();
    works.get();
    assignedWork.get();
  }, []);

  function renderEngineer(engineer: MongoDocument<EngineerType>) {
    return <Engineer key={engineer._id} engineer={engineer} />;
  }

  return (
    <div style={{ width: CONSTANTS.engineersWidth }}>
      <div style={{ height: CONSTANTS.subHeaderHeight }} />
      {map(renderEngineer, engineers)}
      <div className='column w-100 border-top'>
        <AddOrCreateEngineer />
        <UnAssignedWorks />
      </div>
    </div>
  );
}
