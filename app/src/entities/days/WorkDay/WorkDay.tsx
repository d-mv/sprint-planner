import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { MouseEvent } from 'react';

import { getIsDayOff, useSelector } from '../../../state';
import { buildId } from '../../../tools';
import { DayType } from '../days.models';
import classes from './WorkDay.module.scss';

interface Props {
  day: DayType;
  onClick?: (date: Dayjs) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export function WorkDay({ day, onClick }: Props) {
  const isDayOff = useSelector(getIsDayOff);
  const { date, isWeekend } = day;

  const isOff = isDayOff(date);

  return (
    <div
      key={day.id}
      id={buildId('day', day.id)}
      className={clsx('border center', classes['header-cell'], {
        [classes.weekend]: isWeekend,
        [classes['day-off']]: isOff,
        [classes['day-off-2']]: day.isOff,
        [classes['work-day']]: day.isWork,
      })}
    />
  );
}
