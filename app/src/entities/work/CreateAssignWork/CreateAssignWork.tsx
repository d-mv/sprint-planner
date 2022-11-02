import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { compose } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';

import { TEXT } from '../../../data';
import { addWork, assignWork, useDispatch } from '../../../state';
import { setupText } from '../../../tools';
import { AssignedWork, Work } from '../work.models';
import classes from './CreateAssignWork.module.scss';

const TXT = setupText(TEXT)(['work', 'form']);

interface Props {
  engineerId: string;
  onCancel: () => void;
}
export function CreateAssignWork({ engineerId, onCancel }: Props) {
  const [form, setForm] = useState<Work>({
    id: nanoid(),
    jiraTicket: '',
    estimate: 0,
    title: '',
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isValid && (!form.jiraTicket || !form.title || !form.estimate))
      setIsValid(false);
    else if (!isValid && form.jiraTicket && form.title && form.estimate)
      setIsValid(true);
  }, [form.estimate, form.jiraTicket, form.title, isValid]);

  const [start, setStart] = useState(dayjs());
  const dispatch = useDispatch();

  function handleChange(key: keyof typeof form) {
    return function change(e: ChangeEvent<HTMLInputElement>) {
      let value: string | number = e.currentTarget.value;
      // parseInt is safe, as input type is number and it's going to be whole
      // because of parseInt
      if (key === 'estimate') value = parseInt(value);

      setForm({ ...form, [key]: value });
    };
  }

  function handleAssign() {
    // create work
    compose(dispatch, addWork)(form);
    // create assigned work
    const assignedWork: AssignedWork = {
      id: nanoid(),
      workId: form.id,
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

  return (
    <div className={classes.container}>
      <div className={classes.inputs}>
        <div className='line s-between'>
          <TextField
            className={classes['input-item']}
            required
            label={TXT('jira')}
            variant='standard'
            value={form.jiraTicket}
            onChange={handleChange('jiraTicket')}
          />
          <TextField
            className={classes['input-item']}
            label={TXT('epic')}
            variant='standard'
            value={form.jiraEpic}
            onChange={handleChange('jiraEpic')}
          />
        </div>
        <TextField
          className={classes['input-item']}
          required
          label={TXT('title')}
          variant='standard'
          value={form.title}
          onChange={handleChange('title')}
        />
        <div className='line s-between'>
          <TextField
            className={classes['input-item']}
            label={TXT('est')}
            variant='standard'
            type='number'
            value={form.estimate}
            onChange={handleChange('estimate')}
          />
        </div>
        <div className='line s-between m-b-start-1'>
          <TextField
            id='date'
            className={classes.date}
            type='date'
            label={TXT('start')}
            value={start.format('YYYY-M-DD')}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleDateChange}
          />
        </div>
        <div className={classes.actions}>
          <Button
            variant='contained'
            size='small'
            disabled={!isValid}
            onClick={handleAssign}
          >
            {TXT('createAssign')}
          </Button>
        </div>
      </div>
    </div>
  );
}
