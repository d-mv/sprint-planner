import { Button,  Typography } from '@mui/material';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { useState } from 'react';

import { CountOfCount, Message } from '../../../atoms';
import { TEXT } from '../../../data';
import {
  getUnAssignedWorksQty,
  getWorkDaysLeft,
  getWorkDaysPerEngineer,
  updateEngineerDaysOff,
  useDispatch,
  useSelector,
} from '../../../state';
import { ifTrue, makeName, setupText } from '../../../tools';
// import { WorkDaysCounter } from '../../counters';
import { AddDaysOff } from '../../days';
import { AssignWork, CreateAssignWork } from '../../work';
import { Engineer as EngineerType } from '../engineer.models';
import { EngineerWorks } from '../EngineerWorks';
import classes from './Engineer.module.scss';

const TXT = setupText(TEXT)('engineer');

interface Props {
  engineer: EngineerType;
}
export function Engineer({ engineer }: Props) {
  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);
  // useDays({ engineer });
  const workDays = useSelector(getWorkDaysPerEngineer)(engineer.id);
  const workDaysLeft = useSelector(getWorkDaysLeft)(engineer.id);

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
        setIsAssignOpen((state) => !state);
      } else if (item === 'create') {
        if (isDaysOffOpen) setIsDaysOffOpen(false);
        if (isAssignOpen) setIsAssignOpen(false);
        setIsCreateOpen((state) => !state);
      } else {
        if (isAssignOpen) setIsAssignOpen(false);
        if (isCreateOpen) setIsCreateOpen(false);
        setIsDaysOffOpen((state) => !state);
      }
    };
  }

  const renderCreate = () => (
    <CreateAssignWork engineerId={engineer.id} onCancel={toggle('create')} />
  );

  const renderAssign = () => {
    if (!unassignedWorksQty)
      return <Message className='txt-center' message={TXT('noUnAssigned')} />;

    return <AssignWork engineerId={engineer.id} onCancel={toggle('assign')} />;
  };

  function handleUpdate() {
    setIsDaysOffOpen(false);
    setDaysOffUpdated(false);
    compose(
      dispatch,
      updateEngineerDaysOff
    )({ engineerId: engineer.id, days: daysOff });
  }

  function handleSetDaysOff(days: Dayjs[]) {
    setDaysOff(days);
    setDaysOffUpdated(true);
  }

  const renderDaysOff = () => (
    <div className='padding-1'>
      <AddDaysOff daysOff={daysOff} setDaysOff={handleSetDaysOff} />
      <div className='w-100 center padding-1'>
        <Button
          variant='contained'
          size='small'
          disabled={!isDaysOffUpdated}
          onClick={handleUpdate}
        >
          {TXT('update')}
        </Button>
      </div>
    </div>
  );

  return (
    <div className={clsx('column', classes.container)}>
      <div className={clsx('border', classes.left)}>
        <div className={classes.top}>
          <Typography className={classes.name} variant='body1'>
            {makeName(engineer.person)}
          </Typography>
          <CountOfCount
            total={workDays.length}
            left={workDaysLeft}
            tooltip='Points available of total'
          />
          <div className={classes.actions}>
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
        </div>
        {ifTrue(isCreateOpen, renderCreate)}
        {ifTrue(isAssignOpen, renderAssign)}
        {ifTrue(isDaysOffOpen, renderDaysOff)}
      </div>
      <EngineerWorks engineer={engineer} />
    </div>
  );
}
