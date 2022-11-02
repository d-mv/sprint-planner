import { Dayjs } from 'dayjs';
import { compose } from 'ramda';
import { MouseEvent } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { buildArray, duration } from '../../../tools';
import { Days } from '../../days';
import { SprintName } from '../SprintName';
import classes from './Sprint.module.scss';

interface Props {
  sprint: SprintType;
}

export function Sprint({ sprint }: Props) {
  return (
    <div className={classes.container}>
      <SprintName name={sprint.name} />
      <Days sprint={sprint} />
    </div>
  );
}
