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
import { ColorLegend, useApp } from '../app';
import { useEngineers } from './useEngineers.hook';
import { useWorks } from '../work';
import { ifTrue } from '../../tools';

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

  const renderMessage = () => <ErrorMessage message={message} />;

  const renderLegend = () => <ColorLegend />;

  return (
    <div id='engineers' style={{ width: CONSTANTS.engineersWidth }}>
      <div id='header' className='center padding-1' style={{ height: CONSTANTS.subHeaderHeight }}>
        {ifTrue(Boolean(message), renderMessage, renderLegend)}
      </div>
      {map(renderEngineer, addedEngineers)}
      <div className='column w-100 border-top'>
        <AddOrCreateEngineer />
      </div>
    </div>
  );
}
