import { Button, ListItem, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';

import { TEXT } from '../../../data';
import { setupText } from '../../../tools';
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

    const isPresent = daysOff.find((d) => d.isSame(date,'date'));
    if (!isPresent) setDaysOff([...daysOff, date]);
    onClose();
  }
  return (
    <ListItem className={classes.container}>
      <TextField
        id='date'
        className={classes.date}
        type='date'
        defaultValue={dayjs().format('YYYY-M-DD')}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleDateChange}
      />
      <div className={classes.actions}>
        <Button
          variant='contained'
          disabled={!day}
          size='small'
          onClick={handleAddDay}
        >
          {TXT('addDay')}
        </Button>
      </div>
    </ListItem>
  );
}
