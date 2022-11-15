import { Chip } from '@mui/material';
import { CSSProperties } from 'react';

import { Tooltip } from './Tooltip';

interface Props {
  tooltip: string;
  label: string | JSX.Element;
  color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  style?: CSSProperties;
}

export function ChipWithTooltip({ tooltip, label, color, style }: Props) {
  return (
    <span style={style}>
      <Tooltip message={tooltip}>
        <Chip size='small' label={label} color={color} />
      </Tooltip>
    </span>
  );
}
