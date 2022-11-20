import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { compose, map, pick } from 'ramda';
import { useContextSelector } from 'use-context-selector';

import { IconButton } from '../../../../ui';
import { format } from '../../../day.tools';
import { FormItemContext } from '../../contexts';

export function ListOfDays() {
  const { onChange, value } = useContextSelector(FormItemContext, c => pick(['value', 'onChange'], c));

  function handleRemove(v: string) {
    return function call() {
      onChange(((value as string[]) ?? []).filter(d => d !== v));
    };
  }

  function renderAddedDate(v: string) {
    return (
      <div
        id='added-date'
        key={v}
        className='line s-between a-center'
        style={{ width: '40%', margin: '0 auto', marginBlockEnd: '1rem' }}
      >
        <Typography variant='body2'>{compose(format('MMM D'), dayjs)(v)}</Typography>
        <IconButton variant='delete' onClick={handleRemove(v)} />
      </div>
    );
  }

  return <div className='padding-1'>{map(renderAddedDate, value ? (value as string[]) : [])}</div>;
}
