import Button from '@mui/material/Button';
import { useState } from 'react';

import { TEXT } from '../../../data';
import { ifTrue, setupText } from '../../../tools';
import { AddSprint } from '../AddSprint';
import classes from './SprintHeader.module.scss';

const TXT = setupText(TEXT)('sprint');

export function SprintHeader() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen((state) => !state);
  }
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Button variant='contained' onClick={toggleIsOpen}>
          {ifTrue(isOpen, TXT('cancelAddSprint'), TXT('addSprint'))}
        </Button>
      </div>
      <div className={classes.right}>
        {ifTrue(isOpen, () => (
          <AddSprint onClose={handleClose} />
        ))}
      </div>
    </div>
  );
}
