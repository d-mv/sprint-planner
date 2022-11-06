import { Typography } from '@mui/material';
import clsx from 'clsx';

import classes from './SprintName.module.scss';

interface Props {
  name: string;
}

export function SprintName({ name }: Props) {
  return (
    <div className={clsx('border center margin-center', classes.container)}>
      <Typography variant='body1'>{name}</Typography>
    </div>
  );
}
