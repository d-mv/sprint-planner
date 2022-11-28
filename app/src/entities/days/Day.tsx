import { dayjs, DayJS, ifTrue } from '@mv-d/toolbelt';
import { Typography } from '@mui/material';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import { grey } from '@mui/material/colors';
import { CSSProperties, MouseEvent } from 'react';

import { CONFIG, DbDate } from '../../shared';
import { getIsDayOff, useSelector } from '../../state';
import { buildId } from '../../shared/tools/text.tools';

interface Props {
  isLast?: boolean;
  withDate?: boolean;
  day: DbDate;
  onClick?: (date: DayJS.Dayjs) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Day({ day, isLast, onClick, withDate }: Props) {
  const isDayOff = useSelector(getIsDayOff);

  const { date, month, isWeekend, isOff, isWork } = day;

  const isCommonOff = isDayOff(date);

  const isToday = day.date.isSame(dayjs(), 'date');

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (onClick) onClick(date)(e);
  }

  function getStyle(): CSSProperties {
    let style: CSSProperties = {
      height: '3rem',
      width: '4.6rem',
      backgroundColor: CONFIG.colors.regular.backgroundColor,
      color: CONFIG.colors.regular.color,
      border: CONFIG.colors.border,
    };

    if (isCommonOff) style = { ...style, ...CONFIG.colors.commonOff };

    if (isOff) style = { ...style, ...CONFIG.colors.off };

    if (isWeekend) style.backgroundColor = grey[100];

    if (isWork) style = { ...style, ...CONFIG.colors.work };

    if (isToday) return { ...style, borderColor: CONFIG.colors.todayBorder };

    if (isLast) return style;

    return {
      ...style,
      borderRight: 'none',
    };
  }

  function renderDate() {
    return (
      <Typography variant='subtitle1' color={CONFIG.colors.regular.color}>{`${month}/${date
        .date()
        .toString()}`}</Typography>
    );
  }

  function renderTodayIcon() {
    return <TodayOutlinedIcon />;
  }

  return (
    <button
      key={day._id}
      id={buildId(`day-${isLast}`, day._id)}
      onClick={handleClick}
      disabled={!onClick}
      className='center'
      style={getStyle()}
    >
      {ifTrue(withDate, renderDate)}
      {ifTrue(!withDate && isToday, renderTodayIcon)}
    </button>
  );
}
