import { Tooltip as MuiTooltip, Typography } from '@mui/material';
import { ifTrue } from '@mv-d/toolbelt';
import { ReactElement } from 'react';

interface Props {
  message: string;
  children: ReactElement;
  withoutWrapper?: boolean;
}

export function Tooltip({ message, children, withoutWrapper }: Props) {
  const renderWithWrapper = () => <span>{children}</span>;

  const renderWithoutWrapper = () => children;

  return (
    <MuiTooltip
      title={
        <Typography variant='subtitle1' color={'white'}>
          {message}
        </Typography>
      }
    >
      {ifTrue(withoutWrapper, renderWithoutWrapper, renderWithWrapper)}
    </MuiTooltip>
  );
}
