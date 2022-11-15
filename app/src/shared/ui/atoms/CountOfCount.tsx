import { Typography } from '@mui/material';

import { ChipWithTooltip } from './ChipWithTooltip';

interface Props {
  left: number;
  total: number;
  tooltip: string;
}

export function CountOfCount({ total, left, tooltip }: Props) {
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
      <ChipWithTooltip tooltip={tooltip} label={renderLabel()} color={getColor()} />
    </div>
  );
}
