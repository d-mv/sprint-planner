import { TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { validateText } from '../../validators';

export default function Text() {
  const [item, onValidation, isValidated, onChange] = useContextSelector(FormItemContext, c => [
    c.item,
    c.onValidation,
    c.isValidated,
    c.onChange,
  ]);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation } = item;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (validation) onValidation(validateText(item, e.currentTarget.value));
    else onValidation(true);

    onChange(e.currentTarget.value);
  }

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
    />
  );
}
