import { TextField } from '@mui/material';
import { isNil } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { validateText } from '../../validators';

/**
 *
 */
export default function Text() {
  const [item, onValidation, isValidated, onChange, value] = useContextSelector(FormItemContext, c => [
    c.item,
    c.onValidation,
    c.isValidated,
    c.onChange,
    c.value,
  ]);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, defaultValue } = item;

  /**
   *
   * @param v
   */
  function sendUpdate(v: string) {
    if (validation) onValidation(validateText(item, v));
    else onValidation(true);

    onChange(v);
  }

  useEffect(() => {
    if (!isNil(defaultValue)) sendUpdate(defaultValue);
  }, [defaultValue, sendUpdate]);

  /**
   *
   * @param e
   */
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    sendUpdate(e.currentTarget.value);
  }

  /**
   *
   */
  function handleFocus() {
    if (!isTouched) setIsTouched(true);
  }

  return (
    <TextField
      autoCapitalize={item.autoCapitalize}
      autoComplete={item.autoComplete}
      autoFocus={item.autoFocus}
      className={className}
      defaultValue={item.defaultValue}
      error={validation && isTouched && !isValidated}
      id={item.dataId}
      label={label}
      onChange={handleChange}
      onBlur={handleFocus}
      placeholder={item.placeholder}
      required={isRequired}
      style={style}
      variant='standard'
      value={value ?? ''}
    />
  );
}
