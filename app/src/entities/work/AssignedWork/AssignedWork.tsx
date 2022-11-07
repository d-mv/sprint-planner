import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';

import { useAssignedWork } from '../../../adaptors';
import { IconButton } from '../../../atoms';
import { TEXT } from '../../../data';
import { CONSTANTS } from '../../../theme';
import { setupText } from '../../../tools';
import { WorkContext } from '../work.contexts';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';

const TXT = setupText(TEXT)('work');

export function AssignedWork() {
  const workToRender = useContextSelector(WorkContext, c => c.work);

  const { remove } = useAssignedWork();

  function handleUnassign() {
    remove(workToRender._id);
  }

  function renderActions() {
    return (
      <div className={classes.actions}>
        <IconButton variant='edit' disabled={true} onClick={handleUnassign} tooltip={TXT('edit')} />
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
      <WorkLine>{renderActions()}</WorkLine>
    </div>
  );
}
