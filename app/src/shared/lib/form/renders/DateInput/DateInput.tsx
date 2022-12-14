import { TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormContext, FormItemContext } from '../../contexts';
import { makeDefaultValue } from '../../tools';

export default function DateInput() {
  const { item, isValidated, onValidation, onChange, value } = useContextSelector(FormItemContext, c => c);

  const triggerFns = useContextSelector(FormContext, c => c.triggers);

  const { isRequired, className, style, label, validation, triggers } = item;

  const defaultValue = makeDefaultValue(item.defaultValue);

  const sendUpdate = useCallback(
    (v: string) => {
      onChange(v);
      onValidation(true);

      if (triggerFns && triggers?.length)
        triggers?.forEach(trigger => {
          if (trigger in triggerFns) triggerFns[trigger](v);
        });
    },
    [onChange, onValidation, triggerFns, triggers],
  );

  useEffect(() => {
    if (!value && item.defaultValue) {
      sendUpdate(defaultValue);
    }
  }, [defaultValue, item, sendUpdate]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.value) sendUpdate(e.currentTarget.value);
  }

  return (
    <TextField
      id={item.dataId}
      className={className}
      required={isRequired}
      label={label}
      variant='standard'
      onChange={handleChange}
      error={validation && !isValidated}
      value={value}
      style={style}
      type='date'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
