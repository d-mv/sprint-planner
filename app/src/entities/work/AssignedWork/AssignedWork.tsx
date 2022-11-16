import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';

import { IconButton } from '../../../shared';
import { TEXT } from '../../../shared';
import { CONSTANTS } from '../../../shared';
import { ifTrue, setupText } from '../../../shared';
import { useAssignedWork } from '../useAssignedWorks.hook';
import { WorkContext } from '../work.contexts';
import { WorkLine } from '../WorkLine';
import classes from './AssignedWork.module.scss';
import { useState } from 'react';
import { EditWork } from '../EditWork';
import { pick } from 'ramda';

const TXT = setupText(TEXT)('work');

/**
 *
 */
export function AssignedWork() {
  const assigned = useContextSelector(WorkContext, c => c.assigned);

  const { remove } = useAssignedWork();

  const [isEditOpen, setIsEditOpen] = useState(false);

  /**
   *
   */
  function toggleEdit() {
    setIsEditOpen(state => !state);
  }

  /**
   *
   */
  function handleUnassign() {
    if (assigned) remove(assigned._id);
  }

  /**
   *
   */
  function renderActions() {
    return (
      <div className={classes.actions}>
        <IconButton variant='edit' onClick={toggleEdit} tooltip={TXT('edit')} />
        <IconButton variant='delete' onClick={handleUnassign} tooltip={TXT('unassign')} />
      </div>
    );
  }

  /**
   *
   */
  function renderEdit() {
    return <EditWork onCancel={toggleEdit} />;
  }

  return (
    <div className='column'>
      <div
        id='assigned-work'
        className={clsx('align-center w-100', classes.container)}
        style={{ height: CONSTANTS.daysLineHeight }}
      >
        <WorkLine>{renderActions()}</WorkLine>
      </div>
      {ifTrue(isEditOpen, renderEdit)}
    </div>
  );
}
