import { map } from 'ramda';
import { useEffect } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { getMessage, getIsLoading, getSprints, useSelector } from '../../../state';
import { Sprint } from '../Sprint';
import classes from './Sprints.module.scss';
import { MongoDocument } from '../../../models';
import { useSprints } from '../../../adaptors';
import { Spacer, Spinner } from '../../../atoms';
import { SprintWorks } from '../SprintWorks';
import clsx from 'clsx';
import { UnAssignedWorks } from '../../work';

export function Sprints() {
  const sprints = useSelector(getSprints);

  const error = useSelector(getMessage);

  const isLoading = useSelector(getIsLoading)('get-sprints');

  const { get } = useSprints();

  useEffect(() => {
    get();
  }, []);

  function renderSprint(sprint: MongoDocument<SprintType>) {
    return <Sprint key={sprint._id} sprint={sprint} />;
  }

  if (isLoading) return <Spinner />;

  if (error) return null;

  return (
    <div className={clsx('column h-fit w-fit', classes.container)}>
      <div className={clsx('line w-fit', classes.sprints)}>{map(renderSprint, sprints)}</div>
      <SprintWorks />
      <Spacer vertical style={{ height: '2rem' }} />
      <UnAssignedWorks />
    </div>
  );
}
