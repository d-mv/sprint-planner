import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';

import { IconButton } from '../../../shared';
import { TEXT } from '../../../data';
import { CONSTANTS } from '../../../theme';
import { setupText } from '../../../tools';
import { useAssignedWork } from '../useAssignedWorks.hook';
import { WorkContext } from '../work.contexts';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';

const TXT = setupText(TEXT)('work');

export function AssignedWork() {
  const { assigned } = useContextSelector(WorkContext, c => c);

  const { remove } = useAssignedWork();

  function handleUnassign() {
    if (assigned) remove(assigned._id);
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
