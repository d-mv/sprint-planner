import { Collapse, Typography } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { CountOfCount, IconButton, Message } from '../../../shared';
import { TEXT } from '../../../data';
import { getUnAssignedWorksQty, getWorkDaysLeft, getWorkDaysPerEngineer, useSelector } from '../../../state';
import { CONSTANTS } from '../../../theme';
import { ifTrue, setupText } from '../../../tools';
import { AssignWork } from '../../work';
import { CreateAssignWork } from '../../work/CreateAssignWork';
import { EngineerContext } from '../engineer.contexts';
import { makeName } from '../engineer.tools';
import { EngineerDaysOff } from '../EngineerDaysOff';
import { EngineerWorks } from '../EngineerWorks';
import classes from './Engineer.module.scss';

const TXT = setupText(TEXT)('engineer');

export function Engineer() {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);

  const workDays = useSelector(getWorkDaysPerEngineer)(engineer._id);

  const workDaysLeft = useSelector(getWorkDaysLeft)(engineer._id);

  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isDaysOffOpen, setIsDaysOffOpen] = useState(false);

  const [showActions, setShowActions] = useState(false);

  const formIsOpen = () => isCreateOpen || isAssignOpen || isDaysOffOpen;

  const closeDaysOff = () => setIsDaysOffOpen(false);

  function toggleAssign() {
    if (isDaysOffOpen) closeDaysOff();

    if (isCreateOpen) setIsCreateOpen(false);

    setIsAssignOpen(state => !state);
  }

  function toggleDaysOff() {
    if (isAssignOpen) setIsAssignOpen(false);

    if (isCreateOpen) setIsCreateOpen(false);

    setIsDaysOffOpen(state => !state);
  }

  function toggleCreate() {
    if (isDaysOffOpen) closeDaysOff();

    if (isAssignOpen) setIsAssignOpen(false);

    setIsCreateOpen(state => !state);
  }

  function renderCreate() {
    return <CreateAssignWork onCancel={toggleCreate} />;
  }

  function renderAssign() {
    if (!unassignedWorksQty) return <Message className='txt-center' message={TXT('noUnAssigned')} />;

    return <AssignWork onCancel={toggleAssign} />;
  }

  function renderDaysOff() {
    return <EngineerDaysOff onClose={closeDaysOff} />;
  }

  function closeActions() {
    if (formIsOpen()) return;

    setShowActions(false);
  }

  function openActions() {
    setShowActions(true);
  }

  function renderActions() {
    return (
      <div className={clsx('line', classes.actions)}>
        <IconButton
          variant='createWork'
          onClick={toggleCreate}
          tooltip={ifTrue(isCreateOpen, TXT('cancel'), TXT('createWork'))}
          iconProps={ifTrue(isCreateOpen, { color: 'primary' })}
        />
        <IconButton
          variant='assignWork'
          onClick={toggleAssign}
          disabled={!unassignedWorksQty || !workDaysLeft}
          tooltip={ifTrue(isAssignOpen, TXT('cancel'), TXT('assign'))}
          iconProps={ifTrue(isAssignOpen, { color: 'primary' })}
        />
        <IconButton
          variant='dayOff'
          onClick={toggleDaysOff}
          tooltip={ifTrue(isDaysOffOpen, TXT('cancel'), TXT('daysOffButton'))}
          iconProps={ifTrue(isDaysOffOpen, { color: 'primary' })}
        />
      </div>
    );
  }

  return (
    <div className='column s-between'>
      <div
        id='engineer'
        onMouseEnter={openActions}
        onMouseLeave={closeActions}
        className={clsx('border border-right-none', classes['engineer-line'])}
        style={{ width: CONSTANTS.engineersWidth }}
      >
        <div
          className='align-center w-100 padding-1'
          style={{ backgroundColor: CONSTANTS.engineerLineColor, height: '4rem' }}
        >
          <Typography className='w-100' variant='body1'>
            {makeName(engineer.person)}
          </Typography>
          {ifTrue(showActions, renderActions())}
          <CountOfCount total={workDays.length} left={workDaysLeft} tooltip='Points available of total' />
        </div>
        {ifTrue(isCreateOpen, renderCreate)}
        {ifTrue(isAssignOpen, renderAssign)}
        {ifTrue(isDaysOffOpen, renderDaysOff)}
      </div>
      <EngineerWorks />
    </div>
  );
}
