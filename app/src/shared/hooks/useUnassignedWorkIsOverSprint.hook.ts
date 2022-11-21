import { Dayjs } from 'dayjs';

import { useSelector, getCurrentSprint, getWorkById } from '../../state';
import { Option } from '../models';

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
