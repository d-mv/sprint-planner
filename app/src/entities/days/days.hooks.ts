import dayjs, { Dayjs } from 'dayjs';
import { useContextSelector } from 'use-context-selector';
import { Option } from '../../models';
import { useSelector, getSprintDays, getIsDayOff, getCurrentSprint, getWorkById } from '../../state';
import { Engineer } from '../engineer';
import { WorkContext, WorkToRender } from '../work';

export interface UseWorkDaysProps {
  workToRender: WorkToRender;
  engineer: Engineer;
}

export function useWorkDays({ workToRender, engineer }: UseWorkDaysProps) {
  if (!workToRender || !engineer) return { days: [], lastDay: dayjs(), isOverSprint: false };

  const sprintDays = useSelector(getSprintDays);

  const isDayOff = useSelector(getIsDayOff);

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

  const result = days.map(day => {
    const { date, isWeekend, isOff } = day;

    if (!pointsLeft) return day;

    if (isOff || isWeekend) return day;

    if (isDayOff(date)) return day;

    const isSameAsStart = date.isSame(startDate, 'date');

    const isAfterAsStart = date.isAfter(startDate, 'date');

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

export function useWorkIsOverSprint() {
  const { work, assigned } = useContextSelector(WorkContext, c => c);

  const sprint = useSelector(getCurrentSprint);

  if (!assigned || !sprint) return false;

  const endDate = assigned.startDate.add(work.estimate, 'days');

  return endDate.isAfter(sprint.endDate, 'days');
}

export function useUnassignedWorkIsOverSprint() {
  const sprint = useSelector(getCurrentSprint);

  const getter = useSelector(getWorkById);

  return function call(startDate: Option<Dayjs>, workId: string) {
    if (!startDate || !workId) return false;

    const work = getter(workId);

    if (!work || !sprint) return false;

    const endDate = startDate.add(work.estimate, 'days');

    return endDate.isAfter(sprint.endDate);
  };
}
