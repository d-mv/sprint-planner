import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { validateNumber } from '../../validators';

export default function Number() {
  const { item, onValidation, isValidated, onChange } = useContextSelector(FormItemContext, c => c);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation } = item;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (validation) onValidation(validateNumber(item, e.currentTarget.value));

    onChange(e.currentTarget.value);
  }

  function handleFocus() {
    if (!isTouched) setIsTouched(true);
  }

  return (
    <TextField
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
      type='number'
      variant='standard'
    />
  );
}
