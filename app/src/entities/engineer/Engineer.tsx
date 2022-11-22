import { useState } from 'react';
import { setupText, Optional, ifTrue } from '@mv-d/toolbelt';

import { Message, CONSTANTS, LazyLoad, Container } from '../../shared';
import { getUnAssignedWorksQty, useSelector } from '../../state';
import { AssignWork } from './AssignWork';
import { CreateAssignWork } from './CreateAssignWork';
import { EngineerDaysOff } from './EngineerDaysOff';
import { EngineerLine } from './EngineerLine';
import { EngineerWorks } from './EngineerWorks';
import { TEXT } from '../../shared/data/text.data';

const TXT = setupText(TEXT)('engineer');

export function Engineer() {
  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);

  const [isOpen, setIsOpen] = useState<Optional<string>>(undefined);

  const [showActions, setShowActions] = useState(false);

  function toggleIsOpen(item: string) {
    if (isOpen === item) setIsOpen(undefined);
    else setIsOpen(item);
  }

  function handleToggle(item: string) {
    return function click() {
      toggleIsOpen(item);
    };
  }

  function renderCreate() {
    return <CreateAssignWork onCancel={handleToggle('create')} />;
  }

  function renderAssign() {
    if (!unassignedWorksQty) return <Message className='txt-center' message={TXT('noUnAssigned')} />;

    return <AssignWork onCancel={handleToggle('assign')} />;
  }

  function renderDaysOff() {
    return <EngineerDaysOff onClose={handleToggle('daysOff')} />;
  }

  function closeActions() {
    if (isOpen) return;

    setShowActions(false);
  }

  function openActions() {
    setShowActions(true);
  }

  function renderForms() {
    return (
      <Container style={{ paddingInline: '2rem' }}>
        <LazyLoad>
          {ifTrue(isOpen === 'create', renderCreate)}
          {ifTrue(isOpen === 'assign', renderAssign)}
          {ifTrue(isOpen === 'daysOff', renderDaysOff)}
        </LazyLoad>
      </Container>
    );
  }

  return (
    <div className='column s-between'>
      <div
        id='engineer'
        onMouseEnter={openActions}
        onMouseLeave={closeActions}
        className='border border-right-none'
        style={{ width: CONSTANTS.engineersWidth }}
      >
        <EngineerLine showActions={showActions} isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        {ifTrue(isOpen, renderForms)}
      </div>
      <EngineerWorks />
    </div>
  );
}
