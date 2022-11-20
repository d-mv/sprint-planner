import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { compose } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { format } from '../../../day.tools';
import { FormContext, FormItemContext } from '../../contexts';
import { checkIfAddDays, checkIfSubtractDays, makeDefaultValue } from '../../tools';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange, value } = useContextSelector(FormItemContext, c => c);

  const triggerFns = useContextSelector(FormContext, c => c.triggers);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, triggers } = item;

  const defaultValue = makeDefaultValue(item.defaultValue);

  function sendUpdate(v: string) {
    onChange(v);
    onValidation(true);

    if (triggerFns && triggers?.length)
      triggers?.forEach(trigger => {
        if (trigger in triggerFns) triggerFns[trigger](v);
      });
  }

  useEffect(() => {
    if (!value && item.defaultValue) {
      sendUpdate(defaultValue);
    }
  }, [item]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
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
      value={defaultValue}
      style={style}
      type='date'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
