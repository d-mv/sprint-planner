import { Button, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { compose, map } from 'ramda';
import { ChangeEvent, useState } from 'react';

import { TEXT } from '../../../data';
import { assignWork, getUnAssignedWorks, useDispatch, useSelector } from '../../../state';
import { setupText } from '../../../tools';
import { AssignedWork, Work } from '../work.models';
import classes from './AssignWork.module.scss';

const TXT = setupText(TEXT)(['work', 'form']);

interface Props {
  engineerId: string;
  onCancel: () => void;
}

export function AssignWork({ engineerId, onCancel }: Props) {
  const unassignedWorks = useSelector(getUnAssignedWorks);

  const [selected, setSelected] = useState(unassignedWorks[0].id ?? '');

  const [start, setStart] = useState(dayjs());

  const dispatch = useDispatch();

  function handleAssign() {
    const assignedWork: AssignedWork = {
      id: nanoid(),
      workId: selected,
      engineerId,
      start,
    };

    compose(dispatch, assignWork)(assignedWork);
    onCancel();
  }

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    const value = dayjs(e.currentTarget.value);

    setStart(value);
  }

  function handleChange(e: SelectChangeEvent) {
    setSelected(e.target.value);
  }

  function renderWork(work: Work) {
    return (
      <MenuItem key={work.id} value={work.id}>
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
            value={start.format('YYYY-M-DD')}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </div>
        <div className={classes.actions}>
          <Button variant='contained' size='small' onClick={handleAssign}>
            {TXT('assign')}
          </Button>
        </div>
      </div>
    </div>
  );
}
