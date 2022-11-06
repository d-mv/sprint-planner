import { map } from 'ramda';
import { useEffect } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { getMessage, getIsLoading, getSprints, useSelector } from '../../../state';
import { Sprint } from '../Sprint';
import classes from './Sprints.module.scss';
import { MongoDocument } from '../../../models';
import { useSprints } from '../../../adaptors';
import { Spinner } from '../../../atoms';
import { SprintWorks } from '../SprintWorks';
import clsx from 'clsx';

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
    <div className={clsx('column', classes.container)}>
      <div className={classes.sprints}>{map(renderSprint, sprints)}</div>
      <SprintWorks />
    </div>
  );
}
