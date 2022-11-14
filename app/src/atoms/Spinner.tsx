import { CircularProgress } from '@mui/material';
import { CSSProperties } from 'react';

interface Props {
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  style: CSSProperties;
  className: string;
}

export function Spinner({ color, style, className }: Partial<Props>) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}>
      <CircularProgress size={20} className={className} color={color} style={style} />
    </div>
  );
}
