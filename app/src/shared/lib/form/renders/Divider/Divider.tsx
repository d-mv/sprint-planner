import { Divider as MuiDivider } from '@mui/material';
import { isNil } from 'ramda';
import { ChangeEvent, useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';
import { validateNumber } from '../../validators';

export default function Divider() {
  const { item, onValidation, isValidated, onChange, value } = useContextSelector(FormItemContext, c => c);

  const { isRequired, className, style, label, validation, defaultValue } = item;

  return <MuiDivider />;
}
