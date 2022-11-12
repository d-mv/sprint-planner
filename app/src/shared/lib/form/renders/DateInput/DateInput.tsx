import { TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useContextSelector } from 'use-context-selector';

import { FormItemContext } from '../../contexts';

export default function DateInput() {
  const [item, isValidated] = useContextSelector(FormItemContext, c => [c.item, c.isValidated]);

  const { isRequired, className, style, label } = item;

  return (
    <TextField
      id={item.dataId}
      className={className}
      required={isRequired}
      label={label}
      variant='standard'
      error={isValidated}
      defaultValue={dayjs().format('YYYY-M-DD')}
      style={style}
      type='date'
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
