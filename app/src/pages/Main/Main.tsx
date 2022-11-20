import { clsx } from 'clsx';
import { useEffect, useState } from 'react';

import {
  Sprints,
  Engineers,
  useLogin,
  useScenario,
  useAssignedWork,
  useWorks,
  useApp,
  useEngineers,
} from '../../entities';
import classes from './Main.module.scss';
import { Header } from './Header';
import { Menu } from './Menu';
import { makeMatch, MenuItemIds, Option, Dialog, LazyLoad, ifTrue } from '../../shared';
import { AddEngineer } from './AddEngineer';
import { AddSprint } from './AddSprint';
import { AssignEngineer } from './AssignEngineer';

const DIALOGS = makeMatch(
  {
    [MenuItemIds.ADD_SPRINT]: AddSprint,
    [MenuItemIds.ADD_ENGINEER]: AddEngineer,
    [MenuItemIds.ASSIGN_ENGINEER]: AssignEngineer,
  },
  () => null,
);

export function Main() {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const [isOpen, setIsOpen] = useState<Option<MenuItemIds>>(undefined);

  const { disconnect } = useLogin();

  useScenario();

  const engineers = useEngineers();

  const app = useApp();

  const works = useWorks();

  const assignedWork = useAssignedWork();

  useEffect(() => {
    engineers.get();
    app.getAssignedEngineers();
    works.get();
    assignedWork.get();
  }, []);

  function toggleDrawer() {
    setDrawerIsOpen(state => !state);
  }

  function handleAction(id: MenuItemIds) {
    if (id === MenuItemIds.LOGOUT) {
      disconnect();
    } else setIsOpen(id);

    toggleDrawer();
  }

  function handleClose() {
    setIsOpen(undefined);
  }

  function renderDialogContent() {
    if (!isOpen) return null;

    const Content = DIALOGS[isOpen];

    if (Content)
      return (
        <Dialog onClose={handleClose} isOpen={true}>
          <LazyLoad>
            <Content onClose={handleClose} />
          </LazyLoad>
        </Dialog>
      );

    return null;
  }

  return (
    <>
      <Header toggle={toggleDrawer} />
      {ifTrue(isOpen, renderDialogContent)}
      <div className={clsx('line v-scroll', classes.container)}>
        <Engineers />
        <Sprints />
      </div>
      <Menu isOpen={drawerIsOpen} onClose={toggleDrawer} onAction={handleAction} />
    </>
  );
}
