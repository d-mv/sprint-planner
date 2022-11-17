import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { compose } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { format } from '../../../day.tools';
import { FormContext, FormItemContext } from '../../contexts';
import { checkIfAddDays, checkIfSubtractDays } from '../../tools';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange, value } = useContextSelector(FormItemContext, c => c);

  const triggerFns = useContextSelector(FormContext, c => c.triggers);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, defaultValue, triggers } = item;

  function makeDefaultValue() {
    // eslint-disable-next-line no-console
    console.log(value, compose(format, dayjs)(String(value)));

    if (value) return compose(format, dayjs)(String(value));

    if (defaultValue === 'current') return format(dayjs());

    const plus = checkIfAddDays(defaultValue);

    if (plus) return plus;

    const minus = checkIfSubtractDays(defaultValue);

    if (minus) return minus;

    return compose(format, dayjs)(defaultValue);
  }

  function sendUpdate(v: string) {
    // eslint-disable-next-line no-console
    console.log(v);
    onChange(v);
    onValidation(true);

    if (triggerFns && triggers?.length)
      triggers?.forEach(trigger => {
        if (trigger in triggerFns) triggerFns[trigger](v);
      });
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(label, defaultValue, makeDefaultValue());

    if (!value && defaultValue) {
      // setIsInitial(false);
      sendUpdate(makeDefaultValue());
    }
  }, [defaultValue]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    // eslint-disable-next-line no-console
    // console.log('>', e.target.value);
    if (e.currentTarget.value) sendUpdate(e.currentTarget.value);
  }

  function handleFocus() {
    // if (!isTouched) setIsTouched(true);
  }

  return (
    <TextField
      id={item.dataId}
      className={className}
      required={isRequired}
      label={label}
      variant='standard'
      onChange={handleChange}
      onBlur={handleFocus}
      error={validation && !isValidated}
      value={makeDefaultValue()}
      style={style}
      type='date'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
