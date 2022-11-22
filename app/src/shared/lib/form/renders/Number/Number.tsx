import { TextField } from '@mui/material';
import { R } from '@mv-d/toolbelt';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { makeDefaultValue } from '../../tools';
import { validateNumber } from '../../validators';

export default function Number() {
  const { item, onValidation, isValidated, onChange, value } = useContextSelector(FormItemContext, c => c);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation } = item;

  const defaultValue = makeDefaultValue(item.defaultValue);

  function sendUpdate(v: string) {
    if (validation) onValidation(validateNumber(item, v));

    onChange(v);
  }

  useEffect(() => {
    if (!R.isNil(item.defaultValue)) sendUpdate(defaultValue);
  }, [item, sendUpdate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    sendUpdate(e.currentTarget.value);
  }

  function handleFocus() {
    if (!isTouched) setIsTouched(true);
  }

  return (
    <TextField
      autoComplete={item.autoComplete}
      autoFocus={item.autoFocus}
      className={className}
      defaultValue={defaultValue}
      error={validation && isTouched && !isValidated}
      id={item.dataId}
      label={label}
      onChange={handleChange}
      onBlur={handleFocus}
      placeholder={item.placeholder}
      required={isRequired}
      style={style}
      type='number'
      variant='standard'
      value={value}
    />
  );
}
