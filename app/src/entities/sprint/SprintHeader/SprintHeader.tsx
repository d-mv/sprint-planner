import Button from '@mui/material/Button';
import clsx from 'clsx';
import { useState } from 'react';

import { TEXT } from '../../../shared';
import { ifTrue, setupText } from '../../../shared';
import { AddSprint } from '../AddSprint';
import classes from './SprintHeader.module.scss';

const TXT = setupText(TEXT)('sprint');

export function SprintHeader() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleIsOpen() {
    setIsOpen(state => !state);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div id='sprint-header' className={clsx('padding-1', classes.container)}>
      <div className={clsx('line align-center', classes.left)}>
        <Button variant='contained' onClick={toggleIsOpen}>
          {ifTrue(isOpen, TXT('cancelAddSprint'), TXT('addSprint'))}
        </Button>
      </div>
      <div className={clsx('line align-center', classes.right)}>
        {ifTrue(isOpen, () => (
          <AddSprint onClose={handleClose} />
        ))}
      </div>
    </div>
  );
}
