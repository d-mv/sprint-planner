import { ifTrue, R } from '@mv-d/toolbelt';

import { getAssignedEngineers, getMessage, useSelector } from '../../state';
import { Engineer } from './Engineer';
import { ErrorMessage, CONSTANTS, DbEngineer, Message, Container } from '../../shared';
import { EngineerContext } from './engineer.contexts';
import { ColorLegend } from './ColorLegend';
import { EngineersPaneActions } from './EngineersPaneActions';

export function Engineers() {
  const assignedEngineers = useSelector(getAssignedEngineers);

  const message = useSelector(getMessage);

  function renderEngineer(engineer: DbEngineer) {
    return (
      <EngineerContext.Provider key={engineer._id} value={{ engineer }}>
        <Engineer />
      </EngineerContext.Provider>
    );
  }

  const renderMessage = () => <ErrorMessage message={message} />;

  const renderLegend = () => <ColorLegend />;

  const renderNoEngineersMessage = () => (
    <Container>
      <Message message='No engineers assigned' />
    </Container>
  );

  return (
    <div id='engineers' style={{ width: CONSTANTS.engineersWidth }}>
      <div id='header' className='center padding-1' style={{ height: CONSTANTS.subHeaderHeight }}>
        {ifTrue(Boolean(message), renderMessage, renderLegend)}
      </div>
      {R.map(renderEngineer, assignedEngineers)}
      {ifTrue(!assignedEngineers.length, renderNoEngineersMessage)}
      <EngineersPaneActions />
    </div>
  );
}
