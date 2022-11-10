import { map, omit } from 'ramda';
import { useContextSelector } from 'use-context-selector';
import { Spinner } from '../../atoms';
import { MongoDocument } from '../../models';

import { getIsLoading, getWorksForEngineer, useSelector } from '../../state';
import { WorkToRender, WorkContext } from '../work';
import { AssignedWork } from '../work/AssignedWork';
import { EngineerContext } from './engineer.contexts';

export function EngineerWorks() {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const works = useSelector(getWorksForEngineer)(engineer._id);

  const isLoading = useSelector(getIsLoading)('get-works');

  // eslint-disable-next-line no-console
  console.log(works);

  const isLoadingAssigned = useSelector(getIsLoading)('get-assigned-work');

  if (!works.length) return null;

  function renderWork(work: MongoDocument<WorkToRender>) {
    if (!work.work) return null;

    return (
      <WorkContext.Provider key={work._id} value={{ assigned: omit(['work'], work), work: work.work }}>
        <AssignedWork />
      </WorkContext.Provider>
    );
  }

  if (isLoading || isLoadingAssigned) return <Spinner />;

  return <div>{map(renderWork, works)}</div>;
}
