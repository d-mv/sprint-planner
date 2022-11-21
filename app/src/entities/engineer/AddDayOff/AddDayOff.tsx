import { Button, ListItem, TextField } from '@mui/material';
import { clsx } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { ChangeEvent, useState } from 'react';

import { TEXT } from '../../../shared/data/text.data';
import { format } from '../../../shared/lib/day.tools';
import { setupText } from '../../../shared/tools/text.tools';
import classes from './AddDayOff.module.scss';

const TXT = setupText(TEXT)('days');

interface Props {
  daysOff: Dayjs[];
  setDaysOff: (arg0: Dayjs[]) => void;
  onClose: () => void;
}

export function AddDayOff({ daysOff, setDaysOff, onClose }: Props) {
  const [day, setDay] = useState('');

  function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
    setDay(e.currentTarget.value);
  }

  function handleAddDay() {
    const date = dayjs(day);

    const isPresent = daysOff.find(d => d.isSame(date, 'date'));

    if (!isPresent) setDaysOff([...daysOff, date]);

    onClose();
  }

  return (
    <ListItem className='line s-between'>
      <TextField
        id='date'
        className='w-auto'
        type='date'
        defaultValue={compose(format(), dayjs)()}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
      <div className={clsx('h-fit w-fit', classes.actions)}>
        <Button variant='contained' disabled={!day} size='small' onClick={handleAddDay}>
          {TXT('addDay')}
        </Button>
      </div>
    </ListItem>
  );
}