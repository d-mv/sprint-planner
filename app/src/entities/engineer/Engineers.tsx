import { map } from 'ramda';
import { useEffect } from 'react';

import { Engineer as EngineerType } from './engineer.models';
import { getAddedEngineers, getMessage, useSelector } from '../../state';
import { Engineer } from './Engineer';
import { AddOrCreateEngineer } from './AddOrCreateEngineer';
import { MongoDocument } from '../../models';
import { useAssignedWork } from '../work/useAssignedWorks.hook';
import { CONSTANTS } from '../../theme';
import { ErrorMessage } from '../../atoms';
import { EngineerContext } from './engineer.contexts';
import { useApp } from '../app';
import { useEngineers } from './useEngineers.hook';
import { useWorks } from '../work';

export function Engineers() {
  const addedEngineers = useSelector(getAddedEngineers);

  const message = useSelector(getMessage);

  const engineers = useEngineers();

  const app = useApp();

  const works = useWorks();

  const assignedWork = useAssignedWork();

  useEffect(() => {
    engineers.get();
    app.getAddedEngineers();
    works.get();
    assignedWork.get();
  }, []);

  function renderEngineer(engineer: MongoDocument<EngineerType>) {
    return (
      <EngineerContext.Provider key={engineer._id} value={{ engineer }}>
        <Engineer />
      </EngineerContext.Provider>
    );
  }

  return (
    <div style={{ width: CONSTANTS.engineersWidth }}>
      <div className='center padding-1' style={{ height: CONSTANTS.subHeaderHeight }}>
        <ErrorMessage message={message} />
      </div>
      {map(renderEngineer, addedEngineers)}
      <div className='column w-100 border-top'>
        <AddOrCreateEngineer />
      </div>
    </div>
  );
}
