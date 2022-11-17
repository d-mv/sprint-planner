import { Divider as MuiDivider } from '@mui/material';
import { isNil } from 'ramda';
import { ChangeEvent, CSSProperties, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { FormTypes } from '../../models';
import { validateNumber } from '../../validators';

export default function Spacer() {
  const { item, onValidation, isValidated, onChange, value } = useContextSelector(FormItemContext, c => c);

  const { type, isRequired, className, style, label, validation, defaultValue } = item;

  function getStyle(): CSSProperties {
    if (type === FormTypes.V_SPACER) return { width: '1rem', height: '.1rem' };

    return { width: '.1rem', height: '1rem' };
  }

  return <div style={{ ...getStyle(), ...style }} />;
}
