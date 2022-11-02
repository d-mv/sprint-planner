import { map } from 'ramda';

import { getWorksForEngineer, useSelector } from '../../state';
import { WorkToRender } from '../work';
import { AssignedWork } from '../work/AssignedWork';
import { Engineer } from './engineer.models';

interface Props {
  engineer: Engineer;
}
export function EngineerWorks({ engineer }: Props) {
  const works = useSelector(getWorksForEngineer)(engineer.id);

  if (!works.length) return null;

  function renderWork(work: WorkToRender) {
    return (
      <AssignedWork key={work.id} workToRender={work} engineer={engineer} />
    );
  }

  return <div>{map(renderWork, works)}</div>;
}
