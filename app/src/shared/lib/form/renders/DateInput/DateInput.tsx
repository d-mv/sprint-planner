import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormContext, FormItemContext } from '../../contexts';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange } = useContextSelector(FormItemContext, c => c);

  const triggerFns = useContextSelector(FormContext, c => c.triggers);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, defaultValue, triggers } = item;

  function makeDefaultValue() {
    return defaultValue === 'current' ? dayjs().format('YYYY-M-DD') : dayjs(defaultValue).format('YYYY-M-DD');
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
    if (defaultValue) sendUpdate(makeDefaultValue());
  }, [item]);

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
      defaultValue={makeDefaultValue()}
      style={style}
      type='date'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
