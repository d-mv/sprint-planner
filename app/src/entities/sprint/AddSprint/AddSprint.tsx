import { Button, TextField, Typography } from '@mui/material';
import { compose } from 'ramda';
import { clsx } from 'clsx';
import dayjs from 'dayjs';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import { ChangeEvent, useEffect, useState } from 'react';

import classes from './AddSprint.module.scss';
import { AnyValue, Dialog, Form, FormContext, LazyLoad, RecordObject } from '../../../shared';
import './calendarOverride.css';
import './inputOverride.css';
import { addSprint, useDispatch } from '../../../state';
import { Sprint } from '../sprint.models';
import { createSprintScenario } from '../createSprint.scenario';
import { useSprints } from '../useSprints.hook';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

export function AddSprint({ onClose, isOpen }: Props) {
  const [dates, setDates] = useState([new Date(), new Date()]);

  const [name, setName] = useState('');

  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const { add } = useSprints();

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

  // function handleSubmit() {
  //   const sprint: Sprint = {
  //     name,
  //     startDate: dayjs(dates[0]),
  //     endDate: dayjs(dates[1]),
  //     days: [],
  //   };

  //   compose(dispatch, addSprint)(sprint);
  //   onClose();
  // }

  function renderIcon(clear = false) {
    return <span>{clear ? <ClearRoundedIcon /> : <EventNoteRoundedIcon />}</span>;
  }

  function handleSubmit(form: RecordObject<AnyValue>) {
    add(form);
  }

  return (
    <Dialog onClose={onClose} isOpen={isOpen}>
      <LazyLoad>
        <FormContext.Provider value={{ scenario: createSprintScenario, submitData: handleSubmit }}>
          <Form />
        </FormContext.Provider>
      </LazyLoad>
      {/* <div className={clsx('align-f-end', classes.container)}>
        <div className={clsx('align-f-end m-end-1', classes.block)}>
          <Typography variant='body1' className='m-end-1'>
            Name
          </Typography>
          <TextField id='standard-basic' variant='standard' required={true} onChange={handleNameChange} />
        </div>
        <div className='m-end-1'>
          <Typography variant='body1' className='m-end-1'>
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
        <div className='m-end-1'>
          <Button disabled={!isValid} variant='contained' onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div> */}
    </Dialog>
  );
}
