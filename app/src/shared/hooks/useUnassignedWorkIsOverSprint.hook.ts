import { Optional } from '@mv-d/toolbelt';
import { Dayjs } from 'dayjs';

import { useSelector, getCurrentSprint, getWorkById } from '../../state';

export function useUnassignedWorkIsOverSprint() {
  const sprint = useSelector(getCurrentSprint);

  const getter = useSelector(getWorkById);

  return function call(startDate: Optional<Dayjs>, workId: string) {
    if (!startDate || !workId) return false;

    const work = getter(workId);

    if (!work || !sprint) return false;

    const endDate = startDate.add(work.estimate, 'days');

    return endDate.isAfter(sprint.endDate);
  };
}
