import { Button, TextField, Typography } from '@mui/material';
import { dayjs, ifTrue, Optional, R } from '@mv-d/toolbelt';
import { ChangeEvent, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Message } from '../../../../ui';
import { format } from '../../../day.tools';
import { FormItemContext } from '../../contexts';
import { ListOfDays } from './ListOfDays';

export default function DateSet() {
  const { item, onValidation, onChange, value } = useContextSelector(FormItemContext, c =>
    R.pick(['item', 'onValidation', 'onChange', 'value'], c),
  );

  const { style, label, buttons, defaultValue, individualStyles } = item;

  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState<Optional<string>>(null);

  const [error, setError] = useState('');

  function toggleAddDate() {
    if (date) setDate(null);

    setIsOpen(state => !state);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (error) setError('');

    if (value && Array.isArray(value) && value.includes(e.currentTarget.value)) setError('Already added');

    setDate(e.currentTarget.value);
  }

  function handleSubmit() {
    if (error) return;

    onChange([...((value as string[]) ?? []), date]);
    onValidation(true);
    toggleAddDate();
  }

  function makeDefaultValue() {
    if (date) return date;

    if (defaultValue === 'current') return R.compose(format(), dayjs)();

    return '';
  }

  function renderAddDate() {
    return (
      <div className='line' style={style}>
        <TextField
          required={true}
          variant='standard'
          onChange={handleChange}
          value={makeDefaultValue()}
          style={{ width: '100%', margin: '1rem 0', ...(individualStyles ?? {})['input'] }}
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant='text'
          disabled={!date || !!error}
          onClick={handleSubmit}
          style={{ whiteSpace: 'nowrap', marginInlineStart: '1rem' }}
        >
          Add Date
        </Button>
      </div>
    );
  }

  function renderNoDatesMessage() {
    return <Message className='margin-center width-fit txt-center' message={'No days off'} />;
  }

  function getPrimaryLabel() {
    const primary = buttons?.find(b => b.id === 'primary');

    if (!primary) return 'Add Date';

    return primary.label;
  }

  function getSecondaryLabel() {
    const secondary = buttons?.find(b => b.id === 'secondary');

    if (!secondary) return 'Close';

    return secondary.label;
  }

  const renderListOfDates = () => <ListOfDays />;

  return (
    <div style={style}>
      <Typography variant='body1'>{label}</Typography>
      {ifTrue(value?.length, renderListOfDates)}
      {ifTrue(!isOpen && !value?.length, renderNoDatesMessage)}
      {ifTrue(isOpen, renderAddDate)}
      <div style={{ height: '2.2rem', ...(individualStyles ?? {})['error'] }}>
        <Typography variant='subtitle1' color='error'>
          {error}
        </Typography>
      </div>
      <div className='w-100 center padding-1'>
        <Button variant='outlined' onClick={toggleAddDate}>
          {isOpen ? getSecondaryLabel() : getPrimaryLabel()}
        </Button>
      </div>
    </div>
  );
}
