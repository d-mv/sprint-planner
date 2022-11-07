import { Tooltip as MuiTooltip, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface Props {
  message: string;
  children: ReactElement;
}

export function Tooltip({ message, children }: Props) {
  return (
    <MuiTooltip
      title={
        <Typography variant='subtitle1' color={'white'}>
          {message}
        </Typography>
      }
    >
      {children}
    </MuiTooltip>
  );
}
