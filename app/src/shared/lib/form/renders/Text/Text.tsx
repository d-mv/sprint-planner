import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { validateText } from '../../validators';

export default function Text() {
  const [item, onValidation, isValidated] = useContextSelector(FormItemContext, c => [
    c.item,
    c.onValidation,
    c.isValidated,
  ]);

  const { isRequired, className, style, label, validation } = item;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (validation) onValidation(validateText(item, e.currentTarget.value));
  }

  return (
    <TextField
      autoCapitalize={item.autoCapitalize}
      autoComplete={item.autoComplete}
      autoFocus={item.autoFocus}
      className={className}
      defaultValue={item.defaultValue}
      error={!isValidated}
      id={item.dataId}
      label={label}
      onChange={handleChange}
      placeholder={item.placeholder}
      required={isRequired}
      style={style}
      variant='standard'
    />
  );
}
