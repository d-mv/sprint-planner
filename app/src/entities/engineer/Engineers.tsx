import { map } from 'ramda';

import { Engineer as EngineerType } from './engineer.models';
import { getAssignedEngineers, getMessage, useSelector } from '../../state';
import { Engineer } from './Engineer';
import { MongoDocument, ErrorMessage, CONSTANTS, ifTrue } from '../../shared';
import { EngineerContext } from './engineer.contexts';
import { ColorLegend } from '../app';

export function Engineers() {
  const assignedEngineers = useSelector(getAssignedEngineers);

  const message = useSelector(getMessage);

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
      {map(renderEngineer, assignedEngineers)}
    </div>
  );
}
