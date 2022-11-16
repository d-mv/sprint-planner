import { InputLabel, Select, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import { map } from 'ramda';
import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { ifTrue } from '../../../../tools';
import { FormContext, FormItemContext } from '../../contexts';

export default function Selector() {
  const { item, isValidated, onValidation, onChange } = useContextSelector(FormItemContext, c => c);

  const [dataSources, renders, initial, triggerFns] = useContextSelector(FormContext, c => [
    c.dataSources,
    c.renders,
    c.initial,
    c.triggers,
  ]);

  const [isTouched, setIsTouched] = useState(false);

  const [isInitial, setIsInitial] = useState(true);

  const { isRequired, dataId, className, style, label, validation, defaultValue, triggers } = item;

  const value = initial ? String(initial[dataId]) : '';

  const renderer = renders ? renders[dataId] : () => null;

  const data = dataSources ? dataSources[dataId]() : [];

  const labelId = `select-${item.dataId}`;

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

  useEffect(() => {
    if (isInitial && value !== undefined && value !== null) {
      setIsInitial(false);
      sendUpdate(value);
    }
  }, [value]);

  function handleChange(e: SelectChangeEvent) {
    sendUpdate(e.target.value);
  }

  function handleFocus() {
    if (!isTouched) setIsTouched(true);
  }

  function renderLabel() {
    return (
      <InputLabel className='line w-100' id={labelId} required={isRequired} style={{ marginInlineEnd: '1rem' }}>
        {label}
      </InputLabel>
    );
  }

  return (
    <div id='form-renderer-selector' className='line w-100 a-center'>
      {ifTrue(label, renderLabel)}
      <Select
        id={item.dataId}
        labelId={labelId}
        className={className}
        required={isRequired}
        value={value}
        onChange={handleChange}
        variant='standard'
        style={{ display: 'flex', maxWidth: '80%', ...style }}
        onBlur={handleFocus}
        error={validation && !isValidated}
        defaultValue={makeDefaultValue()}
      >
        {map(renderer, data)}
      </Select>
    </div>
  );
}
