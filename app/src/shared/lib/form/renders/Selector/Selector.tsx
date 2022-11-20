import { InputLabel, Select, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import { compose, map } from 'ramda';
import { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { ifTrue } from '../../../../tools';
import { Message } from '../../../../ui';
import { format } from '../../../day.tools';
import { isObject } from '../../../object.tools';
import { FormContext, FormItemContext } from '../../contexts';
import { FormItemValue, FormItemValueTypes } from '../../models';
import { makeDefaultValue } from '../../tools';

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

  const {
    isRequired,
    dataId,
    className,
    style,
    missingDataMessage,
    individualStyles,
    label,
    validation,

    triggers,
  } = item;

  const value = initial ? String(initial[dataId]) : '';

  const data = dataSources ? dataSources[dataId]() : [];

  const defaultValue = makeDefaultValue(item.defaultValue, data);

  const renderer = renders ? renders[dataId] : () => null;

  const labelId = `select-${item.dataId}`;

  function sendUpdate(v: string) {
    onChange(v);
    onValidation(true);

    if (triggerFns && triggers?.length)
      triggers?.forEach(trigger => {
        if (trigger in triggerFns) triggerFns[trigger](v);
      });
  }

  useEffect(() => {
    if (item.defaultValue) sendUpdate(defaultValue);
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
      <InputLabel
        className='line w-100'
        id={labelId}
        required={isRequired}
        style={{
          marginInlineEnd: '1rem',
          ...(individualStyles ?? {})['label'],
        }}
      >
        {label}
      </InputLabel>
    );
  }

  function renderNoDataMessage() {
    return <Message className='margin-center width-fit txt-center' message={missingDataMessage ?? 'No data'} />;
  }

  // eslint-disable-next-line no-console
  console.log('>>', defaultValue);

  function renderSelector() {
    return (
      <>
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
          defaultValue={defaultValue}
        >
          {map(renderer, data)}
        </Select>
      </>
    );
  }

  return (
    <div id='form-renderer-selector' className='line w-100 a-center'>
      {ifTrue(data.length, renderSelector, renderNoDataMessage)}
    </div>
  );
}
