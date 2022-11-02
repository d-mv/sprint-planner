import { Popover } from '@mui/material';
import { Dayjs } from 'dayjs';
import { map } from 'ramda';
import { MouseEvent, useState } from 'react';

import { Sprint as SprintType } from '../sprint.models';
import { Option } from '../../../models';
import {
  addRemoveDayOff,
  getIsDayOff,
  getSprints,
  useDispatch,
  useSelector,
} from '../../../state';
// import { SprintPopup } from '../../days/DayPopup';
import { Sprint } from '../Sprint';
import classes from './Sprints.module.scss';

export function Sprints() {
  const sprints = useSelector(getSprints);

  function renderSprint(sprint: SprintType) {
    return <Sprint key={sprint.id} sprint={sprint} />;
  }
  return <div className={classes.container}>{map(renderSprint, sprints)}</div>;
}
