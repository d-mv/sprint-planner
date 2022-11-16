import { map } from 'ramda';
import clsx from 'clsx';
import { useEffect } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { getMessage, getIsLoading, getSprints, useSelector } from '../../../state';
import classes from './Sprints.module.scss';
import { MongoDocument, Spacer, Spinner } from '../../../shared';
import { SprintWorks } from '../SprintWorks';
import { UnAssignedWorks } from '../../work';
import { useSprints } from '../useSprints.hook';
import { Sprint } from '../Sprint';

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
    <div id='sprints-container' className={clsx('column h-fit w-fit', classes.container)}>
      <div id='sprints' className={clsx('line w-fit', classes.sprints)}>
        {map(renderSprint, sprints)}
      </div>
      <SprintWorks />
      <Spacer vertical style={{ height: '2rem' }} />
      <UnAssignedWorks />
    </div>
  );
}
