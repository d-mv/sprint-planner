import { Days } from '../Days';
import { SprintName } from '../SprintName';
import { DbSprint } from '../../../shared';
import classes from './Sprint.module.scss';

interface Props {
  sprint: DbSprint;
}

export function Sprint({ sprint }: Props) {
  return (
    <section id='sprint' className='column' style={{ borderBottom: 'none' }}>
      <div id='sprint__header' className={classes.list}>
        <SprintName sprint={sprint} />
        <Days sprint={sprint} />
      </div>
    </section>
  );
}
