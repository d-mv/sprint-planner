import { Button, Collapse, Typography } from '@mui/material';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { useState } from 'react';

import { CountOfCount, Message } from '../../../atoms';
import { TEXT } from '../../../data';
import { MongoDocument } from '../../../models';
import {
  getUnAssignedWorksQty,
  getWorkDaysLeft,
  getWorkDaysPerEngineer,
  updateEngineerDaysOff,
  useDispatch,
  useSelector,
} from '../../../state';
import { CONSTANTS } from '../../../theme';
import { ifTrue, setupText } from '../../../tools';
import { AddDaysOff } from '../../days';
import { AssignWork, CreateAssignWork } from '../../work';
import { Engineer as EngineerType } from '../engineer.models';
import { makeName } from '../engineer.tools';
import { EngineerWorks } from '../EngineerWorks';
import classes from './Engineer.module.scss';

const TXT = setupText(TEXT)('engineer');

interface Props {
  engineer: MongoDocument<EngineerType>;
}

export function Engineer({ engineer }: Props) {
  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);

  const workDays = useSelector(getWorkDaysPerEngineer)(engineer._id);

  const workDaysLeft = useSelector(getWorkDaysLeft)(engineer._id);

  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isDaysOffOpen, setIsDaysOffOpen] = useState(false);

  const [daysOff, setDaysOff] = useState<Dayjs[]>(engineer.daysOff);

  const [isDaysOffUpdated, setDaysOffUpdated] = useState(false);

  const dispatch = useDispatch();

  function toggle(item: 'assign' | 'daysOff' | 'create') {
    return function call() {
      if (item === 'assign') {
        if (isDaysOffOpen) setIsDaysOffOpen(false);

        if (isCreateOpen) setIsCreateOpen(false);

        setIsAssignOpen(state => !state);
      } else if (item === 'create') {
        if (isDaysOffOpen) setIsDaysOffOpen(false);

        if (isAssignOpen) setIsAssignOpen(false);

        setIsCreateOpen(state => !state);
      } else {
        if (isAssignOpen) setIsAssignOpen(false);

        if (isCreateOpen) setIsCreateOpen(false);

        setIsDaysOffOpen(state => !state);
      }
    };
  }

  function handleUpdate() {
    setIsDaysOffOpen(false);
    setDaysOffUpdated(false);
    compose(dispatch, updateEngineerDaysOff)({ engineerId: engineer._id, days: daysOff });
  }

  function handleSetDaysOff(days: Dayjs[]) {
    setDaysOff(days);
    setDaysOffUpdated(true);
  }

  function renderCreate() {
    return <CreateAssignWork engineerId={engineer._id} onCancel={toggle('create')} />;
  }

  function renderAssign() {
    if (!unassignedWorksQty) return <Message className='txt-center' message={TXT('noUnAssigned')} />;

    return <AssignWork engineerId={engineer._id} onCancel={toggle('assign')} />;
  }

  function renderDaysOff() {
    return (
      <div className='padding-1'>
        <AddDaysOff daysOff={daysOff} setDaysOff={handleSetDaysOff} />
        <div className='w-100 center padding-1'>
          <Button variant='contained' size='small' disabled={!isDaysOffUpdated} onClick={handleUpdate}>
            {TXT('update')}
          </Button>
        </div>
      </div>
    );
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
      <EngineerWorks engineer={engineer} />
    </div>
  );
}
