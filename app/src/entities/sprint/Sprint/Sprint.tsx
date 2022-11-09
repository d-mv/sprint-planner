import { Sprint as SprintType } from '../sprint.models';
import { Days } from '../../days';
import { SprintName } from '../SprintName';
import { MongoDocument } from '../../../models';
import classes from './Sprint.module.scss';

interface Props {
  sprint: MongoDocument<SprintType>;
}

export function Sprint({ sprint }: Props) {
  return (
    <section id='sprint' className='column border' style={{ borderBottom: 'none' }}>
      <div id='sprint__header' className={classes.list}>
        <SprintName name={sprint.name} />
        <Days sprint={sprint} />
      </div>
    </section>
  );
}
