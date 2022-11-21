import clsx from 'clsx';
import { useContextSelector } from 'use-context-selector';

import { IconButton, Option } from '../../../shared';
import { useSelector, getUnAssignedWorksQty, getWorkDaysLeft } from '../../../state';
import { EngineerContext } from '../engineer.contexts';
import { TEXT } from '../../../shared/data/text.data';
import { setupText } from '../../../shared/tools/text.tools';
import classes from './EngineerActions.module.scss';
import { ifTrue } from '../../../shared/tools/logic.tools';

const TXT = setupText(TEXT)('engineer');

interface Props {
  isOpen: Option<string>;
  toggleIsOpen: (arg0: string) => void;
}

export function EngineerActions({ isOpen, toggleIsOpen }: Props) {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const unassignedWorksQty = useSelector(getUnAssignedWorksQty);

  const workDaysLeft = useSelector(getWorkDaysLeft)(engineer._id);

  function handleToggle(item: string) {
    return function click() {
      toggleIsOpen(item);
    };
  }

  return (
    <div className={clsx('line', classes.actions)}>
      <IconButton
        variant='createWork'
        onClick={handleToggle('create')}
        tooltip={ifTrue(isOpen === 'create', TXT('cancel'), TXT('createWork'))}
        iconProps={ifTrue(isOpen === 'create', { color: 'primary' })}
      />
      <IconButton
        variant='assignWork'
        onClick={handleToggle('assign')}
        disabled={!unassignedWorksQty || !workDaysLeft}
        tooltip={ifTrue(isOpen === 'assign', TXT('cancel'), TXT('assign'))}
        iconProps={ifTrue(isOpen === 'assign', { color: 'primary' })}
      />
      <IconButton
        variant='dayOff'
        onClick={handleToggle('daysOff')}
        tooltip={ifTrue(isOpen === 'daysOff', TXT('cancel'), TXT('daysOffButton'))}
        iconProps={ifTrue(isOpen === 'daysOff', { color: 'primary' })}
      />
    </div>
  );
}
