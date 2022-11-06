import { map } from 'ramda';
import { Spinner } from '../../atoms';
import { MongoDocument } from '../../models';

import { getIsLoading, getWorksForEngineer, useSelector } from '../../state';
import { WorkToRender } from '../work';
import { AssignedWork } from '../work/AssignedWork';
import { Engineer } from './engineer.models';

interface Props {
  engineer: MongoDocument<Engineer>;
}

export function EngineerWorks({ engineer }: Props) {
  const works = useSelector(getWorksForEngineer)(engineer._id);

  const isLoading = useSelector(getIsLoading)('get-works');

  const isLoadingAssigned = useSelector(getIsLoading)('get-assigned-work');

  if (!works.length) return null;

  function renderWork(work: MongoDocument<WorkToRender>) {
    if (!work.work) return null;

    return <AssignedWork key={work._id} workToRender={work} />;
  }

  if (isLoading || isLoadingAssigned) return <Spinner />;

  return <div>{map(renderWork, works)}</div>;
}
