import { map } from 'ramda';
import { useEffect } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { getAuthError, getIsLoading, getSprints, useSelector } from '../../../state';
import { Sprint } from '../Sprint';
import classes from './Sprints.module.scss';
import { MongoDocument } from '../../../models';
import { useSprints } from '../../../adaptors';
import { ErrorMessage, Spinner } from '../../../atoms';

export function Sprints() {
  const sprints = useSelector(getSprints);

  const error = useSelector(getAuthError);

  const isLoading = useSelector(getIsLoading)('get-sprints');

  const { get } = useSprints();

  useEffect(() => {
    get();
  }, []);

  function renderSprint(sprint: MongoDocument<SprintType>) {
    // eslint-disable-next-line no-console
    console.log(sprint);
    return <Sprint key={sprint._id} sprint={sprint} />;
  }

  if (isLoading) return <Spinner />;

  if (error) return <ErrorMessage message={error} />;

  return <div className={classes.container}>{map(renderSprint, sprints)}</div>;
}
