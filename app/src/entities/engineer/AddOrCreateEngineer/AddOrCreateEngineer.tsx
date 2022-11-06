import { Button } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

import { TEXT } from '../../../data';
import { getAddedEngineers, useSelector } from '../../../state';
import { ifTrue, setupText } from '../../../tools';
import { AddEngineer } from '../AddEngineer';
import { CreateEngineer } from '../CreateEngineer';
import classes from './AddOrCreateEngineer.module.scss';

const TXT = setupText(TEXT)('engineer');

export function AddOrCreateEngineer() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [isNewOpen, setIsNewOpen] = useState(false);

  const hasAddedEngineers = !!useSelector(getAddedEngineers).length;

  function toggle(item: 'add' | 'new') {
    return function call() {
      if (item === 'add') {
        if (isNewOpen) setIsNewOpen(state => !state);

        setIsAddOpen(state => !state);
      } else {
        if (isAddOpen) setIsAddOpen(state => !state);

        setIsNewOpen(state => !state);
      }
    };
  }

  const renderNewEngineer = () => <CreateEngineer onCancel={toggle('new')} />;

  const renderAddEngineer = () => <AddEngineer onCancel={toggle('add')} />;

  function renderForms() {
    return (
      <div className={classes.form}>
        {ifTrue(isNewOpen, renderNewEngineer)}
        {ifTrue(isAddOpen, renderAddEngineer)}
      </div>
    );
  }

  return (
    <div
      className={clsx(classes.container, 'border', {
        [classes['border-top']]: hasAddedEngineers,
      })}
    >
      {ifTrue(isNewOpen || isAddOpen, renderForms)}
      <div className={classes.actions}>
        <Button variant='contained' onClick={toggle('add')}>
          {ifTrue(isAddOpen, TXT('cancel'), TXT('add'))}
        </Button>
        <Button variant='outlined' onClick={toggle('new')}>
          {ifTrue(isNewOpen, TXT('cancel'), TXT('new'))}
        </Button>
      </div>
    </div>
  );
}
