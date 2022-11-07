import { map } from 'ramda';

import { Engineer as EngineerType } from './engineer.models';
import { getAddedEngineers, getMessage, useSelector } from '../../state';
import { Engineer } from './Engineer';
import { AddOrCreateEngineer } from './AddOrCreateEngineer';
import { useApp, useEngineers, useWorks } from '../../adaptors';
import { useEffect } from 'react';
import { MongoDocument } from '../../models';
import { useAssignedWork } from '../../adaptors/useAssignedWorks.hook';
import { CONSTANTS } from '../../theme';
import { ErrorMessage } from '../../atoms';
import { EngineerContext } from './engineer.contexts';

export function Engineers() {
  const engineers = useSelector(getAddedEngineers);

  const message = useSelector(getMessage);

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
      {map(renderEngineer, engineers)}
      <div className='column w-100 border-top'>
        <AddOrCreateEngineer />
      </div>
    </div>
  );
}
