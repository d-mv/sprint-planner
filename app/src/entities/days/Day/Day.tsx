import { Typography } from '@mui/material';
import { blueGrey, indigo, pink, red } from '@mui/material/colors';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { CSSProperties, MouseEvent } from 'react';

import { MongoDocument } from '../../../models';
import { getIsDayOff, useSelector } from '../../../state';
import { buildId, ifTrue } from '../../../tools';
import { DayType } from '../days.models';
import classes from './Day.module.scss';

interface Props {
  withDate?: boolean;
  day: MongoDocument<DayType>;
  onClick?: (date: Dayjs) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Day({ day, onClick, withDate }: Props) {
  const isDayOff = useSelector(getIsDayOff);

  const { date, month, isWeekend, isOff, isWork } = day;

  const isCommonOff = isDayOff(date);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) onClick(date)(e);
  }

  function renderDate() {
    return <Typography variant='subtitle1'>{`${month}/${date.date().toString()}`}</Typography>;
  }

  function getColor(): CSSProperties {
    let backgroundColor = '#fff';
    let color = '#fff';

    if (isCommonOff) backgroundColor = pink[500];

    if (isOff) backgroundColor = red[500];

    if (isWeekend) {
      backgroundColor = pink[100];
      color = blueGrey[800];
    }

    if (isWork) backgroundColor = indigo[500];

    return { color, backgroundColor };
  }

  return (
    <button
      key={day._id}
      id={buildId('day', day._id)}
      onClick={handleClick}
      disabled={!onClick}
      className={clsx('border center', classes['header-cell'])}
      style={getColor()}
    >
      {ifTrue(withDate, renderDate)}
    </button>
  );
}
