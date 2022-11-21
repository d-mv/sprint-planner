import dayjs from 'dayjs';

import { WorkToRender } from '../../entities/work/work.models';
import { useSelector, getSprintDays, getIsDayOff } from '../../state';
import { DbDate, DbEngineer } from '../models';

export interface UseWorkDaysProps {
  workToRender: WorkToRender;
  engineer: DbEngineer;
}

export function useWorkDays({ workToRender, engineer }: UseWorkDaysProps) {
  const sprintDays = useSelector(getSprintDays);

  const isDayOff = useSelector(getIsDayOff);

  if (!workToRender || !engineer) return { days: [], lastDay: dayjs(), isOverSprint: false };

  const { daysOff } = engineer;

  const { work, startDate } = workToRender;

  const days = sprintDays.map(day => {
    const r = daysOff.find(d => d.isSame(day.date, 'date'));

    if (!r) return day;

    return { ...day, isOff: true };
  });

  let pointsLeft = work.estimate;
  let lastDay = days[0];

  const isOverSprint = false;

  const shouldReturnDay = ({ date, isWeekend, isOff }: DbDate): boolean => {
    if (!pointsLeft || isOff || isWeekend || isDayOff(date)) return true;

    return false;
  };

  const mapper = (day: DbDate) => {
    const { date } = day;

    if (shouldReturnDay(day)) return day;

    const isSameAsStart = date.isSame(startDate, 'date');

    const isAfterAsStart = date.isAfter(startDate, 'date');

    if (!isSameAsStart && !isAfterAsStart) return day;

    if (isSameAsStart || (pointsLeft && isAfterAsStart)) {
      pointsLeft -= 1;

      if (!pointsLeft) lastDay = day;

      return { ...day, isWork: true };
    }

    return day;
  };

  const result = days.map(mapper);

  return { days: result, lastDay, isOverSprint };
}