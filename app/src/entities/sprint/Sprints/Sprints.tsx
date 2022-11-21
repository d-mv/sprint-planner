import { map } from 'ramda';
import { clsx } from 'clsx';

import { Sprint as SprintType } from '../sprint.models';
import { getMessage, getIsLoading, getSprints, useSelector } from '../../../state';
import classes from './Sprints.module.scss';
import { Container, Message, MongoDocument, Spacer, Spinner } from '../../../shared';
import { SprintWorks } from '../SprintWorks';
import { UnAssignedWorks } from '../UnAssignedWorks';
import { Sprint } from '../Sprint';
import { ifTrue } from '../../../shared/tools/logic.tools';

export function Sprints() {
  const sprints = useSelector(getSprints);

  const error = useSelector(getMessage);

  const isLoading = useSelector(getIsLoading)('get-sprints');

  function renderSprint(sprint: MongoDocument<SprintType>) {
    return <Sprint key={sprint._id} sprint={sprint} />;
  }

  if (isLoading) return <Spinner />;

  if (error) return null;

  const renderWorks = () => <SprintWorks />;

  const renderMessage = () => (
    <Container>
      <Message message='No sprints' />
    </Container>
  );

  return (
    <div id='sprints-container' className={clsx('column h-fit w-fit h-scroll')}>
      <div id='sprints' className={clsx('line w-fit', classes.sprints)}>
        {map(renderSprint, sprints)}
      </div>
      {ifTrue(!sprints.length, renderMessage)}
      {ifTrue(sprints.length, renderWorks)}
      <Spacer vertical style={{ height: '2rem' }} />
      <UnAssignedWorks />
    </div>
  );
}
