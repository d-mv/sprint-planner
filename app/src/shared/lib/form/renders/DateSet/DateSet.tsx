import { Button, TextField, Typography, useTheme } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { map } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { AnyValue, Option } from '../../../../models';
import { ifTrue } from '../../../../tools';
import { IconButton, Message } from '../../../../ui';
import { FormItemContext } from '../../contexts';

export default function DateSet() {
  const { item, onValidation, isValidated, onChange, value } = useContextSelector(FormItemContext, c => c);

  const { type, isRequired, className, style, label, validation, defaultValue } = item;

  const [isOpen, setIsOpen] = useState(false);

  const theme = useTheme();

  const dates = [dayjs()];

  const [date, setDate] = useState<Option<string>>(null);

  function toggleAddDate() {
    if (date) setDate(null);

    setIsOpen(state => !state);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.currentTarget.value);
    // onChange(e.currentTarget.value);
    // onValidation(true);
  }

  function handleSubmit() {
    onChange([...((value as string[]) ?? []), date]);
    onValidation(true);
    toggleAddDate();
  }

  function renderAddDate() {
    return (
      <div className='line' style={style}>
        <TextField
          required={true}
          variant='standard'
          onChange={handleChange}
          value={date}
          style={{ width: '100%', margin: '1rem 0' }}
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant='text'
          disabled={!date}
          onClick={handleSubmit}
          style={{ whiteSpace: 'nowrap', marginInlineStart: '1rem' }}
        >
          Add Date
        </Button>
      </div>
    );
  }

  function handleRemove(v: string) {
    return function call() {
      onChange(((value as string[]) ?? []).filter(d => d !== v));
    };
  }

  function renderAddedDate(v: string) {
    return (
      <div
        id='added-date'
        className='line s-between a-center'
        style={{ width: '40%', margin: '0 auto', marginBlockEnd: '1rem' }}
      >
        <Typography variant='body2'>{dayjs(v).format('MMM D').toString()}</Typography>
        <IconButton variant='delete' onClick={handleRemove(v)} />
      </div>
    );
  }

  function renderNoDatesMessage() {
    return <Message className='margin-center width-fit txt-center' message={'No days off'} />;
  }

  function renderListOfAddedDates() {
    return <div className='padding-1'>{map(renderAddedDate, value ? (value as string[]) : [])}</div>;
  }

  return (
    <div style={style}>
      <Typography variant='body1'>{label}</Typography>
      {ifTrue(value?.length, renderListOfAddedDates)}
      {ifTrue(!isOpen && !value?.length, renderNoDatesMessage)}
      {ifTrue(isOpen, renderAddDate)}
      <div className='w-100 center padding-1'>
        <Button variant='outlined' onClick={toggleAddDate}>
          {isOpen ? 'Close' : 'Add Date'}
        </Button>
      </div>
    </div>
  );
}
