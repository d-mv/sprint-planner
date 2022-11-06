import clsx from 'clsx';

import { useAssignedWork } from '../../../adaptors';
import { IconButton } from '../../../atoms';
import { TEXT } from '../../../data';
import { MongoDocument } from '../../../models';
import { CONSTANTS } from '../../../theme';
import { setupText } from '../../../tools';
import { WorkToRender } from '../work.models';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';

const TXT = setupText(TEXT)('work');

interface Props {
  workToRender: MongoDocument<WorkToRender>;
}

export function AssignedWork({ workToRender }: Props) {
  const { remove } = useAssignedWork();

  function handleUnassign() {
    remove(workToRender._id);
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
      <WorkLine work={workToRender.work}>{renderActions()}</WorkLine>
    </div>
  );
}
