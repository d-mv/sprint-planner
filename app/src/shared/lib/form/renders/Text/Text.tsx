import { TextField } from '@mui/material';
import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';
import { FormItemContext } from '../../contexts';

export default function Text() {
  const [item, onValidation] = useContextSelector(FormItemContext, c => [c.item, c.onValidation]);

  const { isRequired, className, style, label } = item;

  return (
    <TextField
      id={item.dataId}
      className={className}
      required={isRequired}
      label={label}
      variant='standard'
      // value={form.jiraTicket}
      // onChange={handleChange('jiraTicket')}
      style={style}
    />
  );
}
