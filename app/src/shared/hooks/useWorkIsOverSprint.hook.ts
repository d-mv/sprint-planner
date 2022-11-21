import { useContextSelector } from 'use-context-selector';

import { WorkContext } from '../../entities/work/work.contexts';
import { useSelector, getCurrentSprint } from '../../state';

export function useWorkIsOverSprint() {
  const { work, assigned } = useContextSelector(WorkContext, c => c);

  const sprint = useSelector(getCurrentSprint);

  if (!assigned || !sprint) return false;

  const endDate = assigned.startDate.add(work.estimate, 'days');

  return endDate.isAfter(sprint.endDate, 'days');
}
