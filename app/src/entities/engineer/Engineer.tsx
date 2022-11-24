import { useState } from 'react';
import { R, setupText, Optional, ifTrue } from '@mv-d/toolbelt';

import { Message, CONSTANTS, LazyLoad, Container } from '../../shared';
import {
  getIsEngineerUnfolded,
  getUnAssignedWorksQty,
  getWorksForEngineer,
  unfoldEngineer,
  useDispatch,
  useSelector,
} from '../../state';
import { AssignWork } from './AssignWork';
import { CreateAssignWork } from './CreateAssignWork';
import { EngineerDaysOff } from './EngineerDaysOff';
import { EngineerLine } from './EngineerLine';
import { EngineerWorks } from './EngineerWorks';
import { TEXT } from '../../shared/data/text.data';
import { useContextSelector } from 'use-context-selector';
import { EngineerContext } from './engineer.contexts';
import { Collapse } from '@mui/material';

const TXT = setupText(TEXT)('engineer');

export function Engineer() {
  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);

  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const works = useSelector(getWorksForEngineer)(engineer._id);

  const isUnfold = useSelector(getIsEngineerUnfolded)(engineer._id);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState<Optional<string>>(undefined);

  const [showActions, setShowActions] = useState(false);

  function unfold() {
    if (isUnfold) return;

    R.compose(dispatch, unfoldEngineer)(engineer._id);
  }

  function toggleIsOpen(item: string) {
    if (isOpen === item) setIsOpen(undefined);
    else {
      setIsOpen(item);
      unfold();
    }
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

  function renderWorks() {
    if (!works.length) return null;

    return (
      <LazyLoad>
        <EngineerWorks />
      </LazyLoad>
    );
  }

  const renderWorksIfNeeded = () => (works.length ? renderWorks() : null);

  return (
    <div className='column s-between'>
      <div
        id='engineer'
        onMouseEnter={openActions}
        onMouseLeave={closeActions}
        style={{ width: CONSTANTS.engineersWidth }}
      >
        <EngineerLine showActions={showActions} isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
        {ifTrue(isOpen, renderForms)}
      </div>
      <Collapse in={isUnfold}>{renderWorksIfNeeded()}</Collapse>
    </div>
  );
}
