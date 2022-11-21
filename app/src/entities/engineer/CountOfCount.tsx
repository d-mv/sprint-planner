import { Typography } from '@mui/material';
import { useContextSelector } from 'use-context-selector';

import { EngineerContext } from './engineer.contexts';
import { useSelector, getWorkDaysPerEngineer, getWorkDaysLeft } from '../../state';
import { ChipWithTooltip } from '../../shared/ui/atoms/ChipWithTooltip';

export function CountOfCount() {
  const engineer = useContextSelector(EngineerContext, c => c.engineer);

  const total = useSelector(getWorkDaysPerEngineer)(engineer._id).length;

  const left = useSelector(getWorkDaysLeft)(engineer._id);

  const isComplete = left === total;

  const isEmpty = !left;

  const isOverUse = left < 0;

  function getColor() {
    if (isComplete) return 'success';

    if (isOverUse) return 'warning';

    if (isEmpty) return 'info';

    return 'secondary';
  }

  function renderLabel() {
    return (
      <Typography variant='subtitle1' color='white'>
        {`${left}/${total}`}
      </Typography>
    );
  }

  return (
    <div className={'line m-h-1'}>
      <ChipWithTooltip tooltip='Points available of total' label={renderLabel()} color={getColor()} />
    </div>
  );
}
