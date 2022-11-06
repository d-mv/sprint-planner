// import EditIcon from '@mui/icons-material/Edit';
// import { IconButton } from '@mui/material';
import clsx from 'clsx';
import { compose } from 'ramda';
import { IconButton } from '../../../atoms';

// import {  Tooltip } from '../../../atoms';
import { TEXT } from '../../../data';
import { unAssignWork, useDispatch } from '../../../state';
import { CONSTANTS } from '../../../theme';
import { setupText } from '../../../tools';
import { WorkToRender } from '../work.models';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';

const TXT = setupText(TEXT)('work');

interface Props {
  workToRender: WorkToRender;
}

export function AssignedWork({ workToRender }: Props) {
  const dispatch = useDispatch();

  const { work } = workToRender;

  function handleUnassign() {
    compose(dispatch, unAssignWork)(work._id);
  }

  function renderActions() {
    return (
      <div className={classes.actions}>
        <IconButton variant='edit' onClick={handleUnassign} tooltip={TXT('edit')} />
        <IconButton variant='delete' onClick={handleUnassign} tooltip={TXT('unassign')} />
      </div>
    );
  }

  return (
    <div
      id='assigned-work'
      className={clsx('align-center w-100', classes.container)}
      style={{ height: CONSTANTS.daysLineHeight }}
    >
      <WorkLine work={work}>{renderActions()}</WorkLine>
    </div>
  );
}
