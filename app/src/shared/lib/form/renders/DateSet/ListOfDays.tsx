import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import { R, mapI } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';

import { IconButton } from '../../../../ui';
import { format } from '../../../day.tools';
import { FormItemContext } from '../../contexts';

export function ListOfDays() {
  const { onChange, value } = useContextSelector(FormItemContext, c => R.pick(['value', 'onChange'], c));

  function handleRemove(v: string) {
    return function call() {
      onChange(((value as string[]) ?? []).filter(d => d !== v));
    };
  }

  function renderAddedDate(v: string, i: number) {
    return (
      <div
        id='added-date'
        key={`${v}-${i}`}
        className='line s-between a-center'
        style={{ width: '10rem', margin: '0 auto', marginBlockEnd: '1rem' }}
      >
        <Typography variant='body1' color='primary'>
          {R.compose(format('MMM D'), dayjs)(v)}
        </Typography>
        <IconButton variant='delete' onClick={handleRemove(v)} />
      </div>
    );
  }

  return <div className='padding-1'>{mapI(renderAddedDate, value ? (value as string[]) : [])}</div>;
}
