import { clsx } from 'clsx';
import { map } from 'ramda';
import { useState } from 'react';

import { Sprints, Engineers, useLogin } from '../../entities';
import classes from './Main.module.scss';
import { Header } from './Header';
import { Menu } from './Menu';
import { makeMatch, MenuItemType, MenuItemIds, Option, MENU_ITEMS } from '../../shared';
import { AddEngineer } from './AddEngineer';
import { AddSprint } from './AddSprint';

const DIALOGS = makeMatch(
  {
    [MenuItemIds.ADD_SPRINT]: AddSprint,
    [MenuItemIds.ADD_ENGINEER]: AddEngineer,
  },
  () => null,
);

export function Main() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [isOpen, setIsOpen] = useState<Option<MenuItemIds>>(undefined);

  const { disconnect } = useLogin();

  function toggleDrawer() {
    setDrawerIsOpen(state => !state);
  }

  function handleAction(id: MenuItemIds) {
    if (id === MenuItemIds.LOGOUT) {
      disconnect();
    } else setIsOpen(id);

    toggleDrawer();
  }

  function toggleDialogOpen(id: MenuItemIds) {
    return function call() {
      if (id === isOpen) setIsOpen(undefined);
      else setIsOpen(isOpen);
    };
  }

  function renderDialogs(item: MenuItemType) {
    const Dialog = DIALOGS[item.id];

    if (Dialog) return <Dialog isOpen={isOpen === item.id} onClose={toggleDialogOpen(item.id)} />;

    return null;
  }

  return (
    <>
      <Header toggle={toggleDrawer} />
      {map(renderDialogs, MENU_ITEMS)}
      <div className={clsx('line v-scroll', classes.container)}>
        <Engineers />
        <Sprints />
      </div>
      <Menu isOpen={drawerIsOpen} onClose={toggleDrawer} onAction={handleAction} />
    </>
  );
}
