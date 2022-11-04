import { Button, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { ChangeEvent, useEffect, useState } from 'react';

import classes from './AddSprint.module.scss';
import { AnyValue } from '../../../models';
import './calendarOverride.css';
import './inputOverride.css';
import { addSprint, useDispatch } from '../../../state';
import { buildSprintDays } from '../../days/days.tools';
import { Sprint } from '../sprint.models';
import { compose } from 'ramda';

interface Props {
  onClose: () => void;
}

export function AddSprint({ onClose }: Props) {
  const [dates, setDates] = useState([new Date(), new Date()]);

  const [name, setName] = useState('');

  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (name && dates?.length === 2 && dates?.every(Boolean) && !isValid) setIsValid(true);
    else if ((!name || !dates || dates?.length !== 2 || !dates?.every(Boolean)) && isValid) setIsValid(false);
  }, [name, dates, isValid]);

  function updateBorderColor(isActive = false) {
    return function call() {
      const element = document.getElementsByClassName('react-daterange-picker__wrapper');

      if (isActive) element[0]?.setAttribute('style', 'border-color: #1976d2');
      else element[0]?.setAttribute('style', 'rgb(147,147,147)');
    };
  }

  function handleDateChange(arg: AnyValue) {
    setDates(arg as Date[]);
  }

  function handleNameChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setName(e.currentTarget.value);
  }

  function handleSubmit() {
    const sprint: Sprint = {
      name,
      startDate: dayjs(dates[0]),
      endDate: dayjs(dates[1]),
      days: [],
    };

    compose(dispatch, addSprint)(sprint);
    onClose();
  }

  function renderIcon(clear = false) {
    return <span>{clear ? <ClearRoundedIcon /> : <EventNoteRoundedIcon />}</span>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.block}>
        <Typography variant='body1' className={classes.label}>
          Name
        </Typography>
        <TextField id='standard-basic' variant='standard' required={true} onChange={handleNameChange} />
      </div>
      <div className={classes.block}>
        <Typography variant='body1' className={classes.label}>
          Start/end dates
        </Typography>
        <DateRangePicker
          onCalendarOpen={updateBorderColor(true)}
          onCalendarClose={updateBorderColor()}
          onChange={handleDateChange}
          calendarIcon={renderIcon()}
          clearIcon={renderIcon(true)}
          className={classes.picker}
          value={dates}
        />
      </div>
      <div className={classes.block}>
        <Button disabled={!isValid} variant='contained' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
