import { useSelector, getSprintDays, getIsDayOff } from '../../state';
import { Engineer } from '../engineer';
import { WorkToRender } from '../work';

export interface UseWorkDaysProps {
  workToRender: WorkToRender;
  engineer: Engineer;
}
export function useWorkDays({ workToRender, engineer }: UseWorkDaysProps) {
  const sprintDays = useSelector(getSprintDays);
  const isDayOff = useSelector(getIsDayOff);

  const { daysOff } = engineer;
  const { work, start } = workToRender;

  const days = sprintDays.map((day) => {
    const r = daysOff.find((d) => d.isSame(day.date, 'date'));
    if (!r) return day;
    return { ...day, isOff: true };
  });

  let pointsLeft = work.estimate;
  let lastDay = days[0];
  let isOverSprint = false;

  const result = days.map((day) => {
    const { date, isWeekend, isOff } = day;

    if (!pointsLeft) return day;
    if (isOff || isWeekend) return day;
    if (isDayOff(date)) return day;

    const isSameAsStart = date.isSame(start, 'date');
    const isAfterAsStart = date.isAfter(start, 'date');

    if (!isSameAsStart && !isAfterAsStart) return day;

    if (isSameAsStart || (pointsLeft && isAfterAsStart)) {
      pointsLeft -= 1;
      if (!pointsLeft) lastDay = day;

      return { ...day, isWork: true };
    }

    return day;
  });

  return { days: result, lastDay, isOverSprint };
}

