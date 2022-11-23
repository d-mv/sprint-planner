import { ifTrue, setupText } from '@mv-d/toolbelt';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useContextSelector } from 'use-context-selector';

import { IconButton, CONSTANTS, LazyLoad } from '../../../shared';
import { useAssignedWork } from '../../work/useAssignedWorks.hook';
import { WorkContext } from '../../work/work.contexts';
import { WorkLine } from '../../work/WorkLine';
import classes from './AssignedWork.module.scss';
import { TEXT } from '../../../shared/data/text.data';
import { EditWork } from '../../work/EditWork';

const TXT = setupText(TEXT)('work');

export function AssignedWork() {
  const assigned = useContextSelector(WorkContext, c => c.assigned);

  const { remove } = useAssignedWork();

  const [isEditOpen, setIsEditOpen] = useState(false);

  function toggleEdit() {
    setIsEditOpen(state => !state);
  }

  function handleUnassign() {
    if (assigned) remove(assigned._id);
  }

  function renderActions() {
    return (
      <div className={classes.actions}>
        <IconButton variant='edit' onClick={toggleEdit} tooltip={TXT('edit')} />
        <IconButton variant='delete' onClick={handleUnassign} tooltip={TXT('unassign')} />
      </div>
    );
  }

  function renderEdit() {
    return (
      <LazyLoad>
        <EditWork onCancel={toggleEdit} />
      </LazyLoad>
    );
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
