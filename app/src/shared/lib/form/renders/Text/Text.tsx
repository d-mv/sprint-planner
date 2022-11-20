import { TextField } from '@mui/material';
import { isNil } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { makeDefaultValue } from '../../tools';
import { validateText } from '../../validators';

export default function Text() {
  const [item, onValidation, isValidated, onChange, value] = useContextSelector(FormItemContext, c => [
    c.item,
    c.onValidation,
    c.isValidated,
    c.onChange,
    c.value,
  ]);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation } = item;

  const defaultValue = makeDefaultValue(item.defaultValue);

  function sendUpdate(v: string) {
    if (validation) onValidation(validateText(item, v));
    else onValidation(true);

    onChange(v);
  }

  useEffect(() => {
    if (!isNil(item.defaultValue)) sendUpdate(defaultValue);
  }, [item, sendUpdate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    sendUpdate(e.currentTarget.value);
  }

  function handleFocus() {
    if (!isTouched) setIsTouched(true);
  }

  // eslint-disable-next-line no-console
  console.log(item.autoFocus, item.label);
  return (
    <TextField
      autoCapitalize={item.autoCapitalize}
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
      style={{ width: '100%', ...style }}
      variant='standard'
      value={value ?? ''}
    />
  );
}
