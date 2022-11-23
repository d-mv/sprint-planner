import { R } from '@mv-d/toolbelt';
import { useContextSelector } from 'use-context-selector';
import { DbWorkToRender, Spinner } from '../../../shared';

import { getIsLoading, getWorksForEngineer, useSelector } from '../../../state';
import { WorkContext } from '../../work';
import { AssignedWork } from '../AssignedWork';
import { EngineerContext } from '../engineer.contexts';

function renderWork(work: DbWorkToRender) {
  if (!work.work) return null;

  return (
    <WorkContext.Provider key={work._id} value={{ assigned: R.omit(['work'], work), work: work.work }}>
      <AssignedWork />
    </WorkContext.Provider>
  );
}

export default function EngineerWorks() {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const works = useSelector(getWorksForEngineer)(engineer._id);

  const isLoading = useSelector(getIsLoading)('get-works');

  const isLoadingAssigned = useSelector(getIsLoading)('get-assigned-work');

  if (!works.length) return null;

  if (isLoading || isLoadingAssigned) return <Spinner />;

  return <div id='engineer-works'>{R.map(renderWork, works)}</div>;
}
