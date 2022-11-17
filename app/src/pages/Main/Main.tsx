import { clsx } from 'clsx';
import { useState } from 'react';

import { Sprints, Engineers, useLogin } from '../../entities';
import classes from './Main.module.scss';
import { Header } from './Header';
import { Menu } from './Menu';
import { AddSprint } from '../../entities/sprint/AddSprint';

export function Main() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [addSprintIsOpen, setAddSprintIsOpen] = useState(false);

  const { disconnect } = useLogin();

  function toggleDrawer() {
    setDrawerIsOpen(state => !state);
  }

  function toggleSprintIsOpen() {
    setAddSprintIsOpen(state => !state);
  }

  function handleAction(action: string) {
    return function call() {
      if (action === 'Logout') {
        disconnect();
        toggleDrawer();
      } else if (action === 'Add Sprint') toggleSprintIsOpen();
    };
  }

  return (
    <>
      <Header toggle={toggleDrawer} />
      <AddSprint isOpen={addSprintIsOpen} onClose={toggleSprintIsOpen} />
      <div className={clsx('line v-scroll', classes.container)}>
        <Engineers />
        <Sprints />
      </div>
      <Menu isOpen={drawerIsOpen} onClose={toggleDrawer} onAction={handleAction} />
    </>
  );
}
