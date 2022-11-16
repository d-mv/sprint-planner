import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormContext, FormItemContext } from '../../contexts';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange, value } = useContextSelector(FormItemContext, c => c);

  const triggerFns = useContextSelector(FormContext, c => c.triggers);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, defaultValue, triggers } = item;

  function makeDefaultValue() {
    if (value) return dayjs(value).format('YYYY-M-DD');
    if (defaultValue === 'current') return dayjs().format('YYYY-M-DD')
    return dayjs(defaultValue).format('YYYY-M-DD');
  }

  function sendUpdate(v: string) {
    onChange(v);
    onValidation(true);

    if (triggerFns && triggers?.length)
      triggers?.forEach(trigger => {
        if (trigger in triggerFns) triggerFns[trigger](v);
      });
  }

  useEffect(() => {

  sendUpdate(makeDefaultValue());
  }, [defaultValue]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    sendUpdate(e.currentTarget.value);
  }

  function handleFocus() {
    if (!isTouched) setIsTouched(true);
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
