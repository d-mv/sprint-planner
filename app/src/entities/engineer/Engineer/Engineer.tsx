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
import { CreateAssignWork2 } from '../../work/CreateAssignWork/CreateAssignWork2';
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

  function toggle(item: 'assign' | 'daysOff' | 'create') {
    return function call() {
      if (item === 'assign') {
        if (isDaysOffOpen) closeDaysOff();

        if (isCreateOpen) setIsCreateOpen(false);

        setIsAssignOpen(state => !state);
      } else if (item === 'create') {
        if (isDaysOffOpen) closeDaysOff();

        if (isAssignOpen) setIsAssignOpen(false);

        setIsCreateOpen(state => !state);
      } else {
        if (isAssignOpen) setIsAssignOpen(false);

        if (isCreateOpen) setIsCreateOpen(false);

        setIsDaysOffOpen(state => !state);
      }
    };
  }

  function renderCreate() {
    return <CreateAssignWork2 onCancel={toggle('create')} />;
  }

  function renderAssign() {
    if (!unassignedWorksQty) return <Message className='txt-center' message={TXT('noUnAssigned')} />;

    return <AssignWork onCancel={toggle('assign')} />;
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
          onClick={toggle('create')}
          tooltip={ifTrue(isCreateOpen, TXT('cancel'), TXT('createWork'))}
          iconProps={ifTrue(isCreateOpen, { color: 'primary' })}
        />
        <IconButton
          variant='assignWork'
          onClick={toggle('assign')}
          disabled={!unassignedWorksQty || !workDaysLeft}
          tooltip={ifTrue(isAssignOpen, TXT('cancel'), TXT('assign'))}
          iconProps={ifTrue(isAssignOpen, { color: 'primary' })}
        />
        <IconButton
          variant='dayOff'
          onClick={toggle('daysOff')}
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
