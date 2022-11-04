import { grey } from '@mui/material/colors';
import { CSSProperties } from 'react';

interface Props {
  className: string;
  noMargin: boolean;
  width: string;
}

export function Divider({ className, noMargin, width }: Partial<Props>) {
  let style: CSSProperties = {
    width: width ?? '75%',
    borderTop: `.1rem solid ${grey['300']}`,
  };

  if (!noMargin) style = { ...style, margin: '0 auto', marginBlockEnd: '.1rem' };

  return <div className={className} style={style} />;
}
