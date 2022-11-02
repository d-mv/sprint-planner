import { Typography } from '@mui/material';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { MouseEvent } from 'react';

import { getIsDayOff, useSelector } from '../../../state';
import { buildId } from '../../../tools';
import { DayType } from '../days.models';
import classes from './Day.module.scss';

interface Props {
  day: DayType;
  onClick?: (date: Dayjs) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Day({ day, onClick }: Props) {
  const isDayOff = useSelector(getIsDayOff);
  const { date, month, isWeekend } = day;

  const isOff = isDayOff(date);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) onClick(date)(e);
  }

  return (
    <button
      key={day.id}
      id={buildId('day', day.id)}
      onClick={handleClick}
      className={clsx('border center', classes['header-cell'], {
        [classes.weekend]: isWeekend,
        [classes['day-off']]: isOff,
      })}
    >
      <Typography variant='subtitle1'>{`${month}/${date
        .date()
        .toString()}`}</Typography>
    </button>
  );
}
