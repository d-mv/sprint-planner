import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { map } from 'ramda';
import { ChangeEvent, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { useAssignedWork } from '../../../adaptors';
import { TEXT } from '../../../data';
import { MongoDocument } from '../../../models';
import { getUnAssignedWorks, useSelector } from '../../../state';
import { setupText } from '../../../tools';
import { EngineerContext } from '../../engineer/engineer.contexts';
import { AssignedWork, Work } from '../work.models';
import classes from './AssignWork.module.scss';

const TXT = setupText(TEXT)(['work', 'form']);

interface Props {
  onCancel: () => void;
}

export function AssignWork({ onCancel }: Props) {
  const engineerId = useContextSelector(EngineerContext, c => c.engineer._id);

  const unassignedWorks = useSelector(getUnAssignedWorks);

  const [selected, setSelected] = useState(unassignedWorks[0]._id ?? '');

  const [startDate, setStartDate] = useState(dayjs());

  const { add } = useAssignedWork();

  function handleAssign() {
    const assignedWork: AssignedWork = {
      workId: selected,
      engineerId,
      startDate,
    };

    add(assignedWork);

    onCancel();
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = dayjs(e.currentTarget.value);

    setStartDate(value);
  }

  function handleChange(e: SelectChangeEvent) {
    setSelected(e.target.value);
  }

  function renderWork(work: MongoDocument<Work>) {
    return (
      <MenuItem key={work._id} value={work._id}>
        {`${work.jiraTicket} ${work.title}`}
      </MenuItem>
    );
  }

  return (
    <div className={classes.container}>
      <div className={clsx('padding-1', classes.inputs)}>
        <div className='column'>
          <Select value={selected} onChange={handleChange}>
            {map(renderWork, unassignedWorks)}
          </Select>
        </div>
        <div className='line s-between m-b-start-1'>
          <TextField
            id='date'
            className={classes.date}
            type='date'
            label={TXT('start')}
            defaultValue={dayjs().format('YYYY-M-DD')}
            value={startDate.format('YYYY-M-DD')}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </div>
        <div className={clsx('center', classes.actions)}>
          <Button variant='contained' size='small' onClick={handleAssign}>
            {TXT('assign')}
          </Button>
        </div>
      </div>
    </div>
  );
}
