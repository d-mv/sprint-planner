import { Sprint as SprintType } from '../sprint.models';
import { Days } from '../../days';
import { SprintName } from '../SprintName';
import classes from './Sprint.module.scss';
import { MongoDocument } from '../../../models';

interface Props {
  sprint: MongoDocument<SprintType>;
}

export function Sprint({ sprint }: Props) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <SprintName name={sprint.name} />
        <Days sprint={sprint} />
      </div>
    </div>
  );
}
