import { Typography } from '@mui/material';
import { CSSProperties } from 'react';

interface Props {
  message: string;
  className?: string;
  style?: CSSProperties;
}

export function ErrorMessage({ message, className, style }: Props) {
  return (
    <Typography variant='body2' color='error' className={className} style={style}>
      {message}
    </Typography>
  );
}
