import { ifTrue } from '@mv-d/toolbelt';
import { Typography } from '@mui/material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import { grey } from '@mui/material/colors';
import { clsx } from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { CSSProperties, MouseEvent } from 'react';

import { CONFIG, DbDate } from '../../../shared';
import { getIsDayOff, useSelector } from '../../../state';
import classes from './Day.module.scss';
import { buildId } from '../../../shared/tools/text.tools';

interface Props {
  withDate?: boolean;
  day: DbDate;
  onClick?: (date: Dayjs) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Day({ day, onClick, withDate }: Props) {
  const isDayOff = useSelector(getIsDayOff);

  const { date, month, isWeekend, isOff, isWork } = day;

  const isCommonOff = isDayOff(date);

  const isToday = day.date.isSame(dayjs(), 'date');

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) onClick(date)(e);
  }

  function getColor(): CSSProperties {
    let style: CSSProperties = {
      backgroundColor: CONFIG.colors.regular.backgroundColor,
      color: CONFIG.colors.regular.color,
      border: CONFIG.colors.border,
    };

    if (isCommonOff) style = { ...style, ...CONFIG.colors.commonOff };

    if (isOff) style = { ...style, ...CONFIG.colors.off };

    if (isWeekend) style.backgroundColor = grey[100];

    if (isWork) style = { ...style, ...CONFIG.colors.work };

    if (isToday) return { ...style, borderColor: CONFIG.colors.todayBorder };

    return { ...style, borderRight: 'none' };
  }

  function renderDate() {
    return <Typography variant='subtitle1' color={getColor().color}>{`${month}/${date.date().toString()}`}</Typography>;
  }

  function renderTodayIcon() {
    return <TodayOutlinedIcon />;
  }

  return (
    <button
      key={day._id}
      id={buildId('day', day._id)}
      onClick={handleClick}
      disabled={!onClick}
      className={clsx('center', classes.container)}
      style={getColor()}
    >
      {ifTrue(withDate, renderDate)}
      {ifTrue(!withDate && isToday, renderTodayIcon)}
    </button>
  );
}
