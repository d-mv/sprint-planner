import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { IconButton } from '@mui/material';
import { compose, map } from 'ramda';

import { DeleteButton, Tooltip } from '../../../atoms';
import { TEXT } from '../../../data';
import { MongoDocument } from '../../../models';
import { unAssignWork, useDispatch } from '../../../state';
import { setupText } from '../../../tools';
import { DayType, useWorkDays, WorkDay } from '../../days';
import { Engineer } from '../../engineer';
import { WorkToRender } from '../work.models';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';

const TXT = setupText(TEXT)('work');

interface Props {
  workToRender: WorkToRender;
  engineer: Engineer;
}

export function AssignedWork({ workToRender, engineer }: Props) {
  const { days, isOverSprint } = useWorkDays({ engineer, workToRender });

  const dispatch = useDispatch();

  const { work } = workToRender;

  function handleUnassign() {
    compose(dispatch, unAssignWork)(work.id);
  }

  function renderActions() {
    return (
      <div className={classes.actions}>
        <Tooltip message='Edit'>
          <IconButton edge='end' aria-label='delete' onClick={handleUnassign}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <DeleteButton onClick={handleUnassign} tooltip={TXT('unassign')} />
      </div>
    );
  }

  function renderOverSprint() {
    if (!isOverSprint) return null;

    return (
      <Tooltip message='This work is longer than sprint(s)'>
        <WarningIcon />
      </Tooltip>
    );
  }

  function renderWorkDay(day: MongoDocument<DayType>) {
    return <WorkDay key={day._id} day={day} />;
  }

  return (
    <div id='assigned-work' className={classes.container}>
      <div className={classes.left}>
        <WorkLine work={work}>
          {renderOverSprint()}
          {renderActions()}
        </WorkLine>
      </div>
      <div className={classes.days}>{map(renderWorkDay, days)}</div>
    </div>
  );
}
