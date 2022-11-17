import { nanoid } from 'nanoid';
import { Button, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';

import { ChangeEvent, useEffect, useState } from 'react';

import { Engineer as EngineerType } from '../engineer.models';
import classes from './CreateEngineer.module.scss';
import { TEXT } from '../../../shared';
import { setupText } from '../../../shared';
import { createEngineer, useDispatch } from '../../../state';
import { Divider } from '../../../shared';
import { AddDaysOff } from '../../days';
import { clsx } from 'clsx';

const TXT = setupText(TEXT)('engineer');

interface Props {
  onCancel: () => void;
}

export function CreateEngineer({ onCancel }: Props) {
  const [fName, setFName] = useState('');

  const [lName, setLName] = useState('');

  const [isValid, setIsValid] = useState(false);

  const [daysOff, setDaysOff] = useState<Dayjs[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fName && lName && !isValid) setIsValid(true);
    else if ((!fName || !lName) && isValid) setIsValid(false);
  }, [fName, lName, isValid]);

  function handleCreate() {
    const engineer: EngineerType = {
      person: { firstName: fName, lastName: lName },
      daysOff,
    };

    dispatch(createEngineer(engineer));
    onCancel();
  }

  function handleFistNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFName(e.currentTarget.value);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    setLName(e.currentTarget.value);
  }

  return (
    <div className='column border padding-1'>
      <div className={clsx('line s-between', classes.input)}>
        <TextField id='standard-basic' label='First Name' variant='standard' onChange={handleFistNameChange} />
        <TextField id='standard-basic' label='Last Name' variant='standard' onChange={handleLastNameChange} />
      </div>
      <AddDaysOff daysOff={daysOff} setDaysOff={setDaysOff} />
      <Divider noMargin width='50%' className='m-vertical' />
      <div className={clsx('line w-100', classes.actions)}>
        <Button variant='contained' disabled={!isValid} onClick={handleCreate}>
          {TXT('create')}
        </Button>
      </div>
    </div>
  );
}
