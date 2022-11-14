import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange } = useContextSelector(FormItemContext, c => c);

  const [isTouched, setIsTouched] = useState(false);

  const { isRequired, className, style, label, validation, defaultValue } = item;

  function makeDefaultValue() {
    return defaultValue === 'current' ? dayjs().format('YYYY-M-DD') : dayjs(defaultValue).format('YYYY-M-DD');
  }

  useEffect(() => {
    if (defaultValue) {
      onChange(makeDefaultValue());
      onValidation(true);
    }
  }, [item]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onValidation(true);
    onChange(e.currentTarget.value);
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
