import { Button, Collapse, Typography } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { CountOfCount, Message } from '../../../atoms';
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

  function renderActions() {
    return (
      <div className={clsx('line', classes.actions)}>
        <Button variant='contained' size='small' onClick={toggle('create')}>
          {ifTrue(isCreateOpen, TXT('cancel'), TXT('createWork'))}
        </Button>
        <Button
          variant='contained'
          size='small'
          color='success'
          disabled={!unassignedWorksQty || !workDaysLeft}
          onClick={toggle('assign')}
        >
          {ifTrue(isAssignOpen, TXT('cancel'), TXT('assign'))}
        </Button>
        <Button variant='outlined' size='small' onClick={toggle('daysOff')}>
          {ifTrue(isDaysOffOpen, TXT('cancel'), TXT('daysOffButton'))}
        </Button>
      </div>
    );
  }

  return (
    <div className='column s-between'>
      <div
        id='engineer'
        className='border border-right-none'
        style={{ minHeight: CONSTANTS.engineerLineHeight, width: CONSTANTS.engineersWidth }}
      >
        <div className='align-center w-100 padding-1' style={{ backgroundColor: CONSTANTS.engineerLineColor }}>
          <Typography className='w-100' variant='body1'>
            {makeName(engineer.person)}
          </Typography>
          <CountOfCount total={workDays.length} left={workDaysLeft} tooltip='Points available of total' />
          {renderActions()}
        </div>
        <Collapse orientation='vertical' in={isCreateOpen}>
          {renderCreate()}
        </Collapse>
        <Collapse orientation='vertical' in={isAssignOpen}>
          {renderAssign()}
        </Collapse>
        <Collapse orientation='vertical' in={isDaysOffOpen}>
          {renderDaysOff()}
        </Collapse>
      </div>
      <EngineerWorks />
    </div>
  );
}
