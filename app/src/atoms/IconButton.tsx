import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton as MuiIconButton } from '@mui/material';
import { makeMatch } from '../tools';

import { Tooltip } from './Tooltip';

const VARIANTS = makeMatch(
  {
    delete: <DeleteIcon />,
    edit: <EditIcon />,
  },
  <div id='no-icon-found' />,
);

interface Props {
  onClick: () => void;
  variant: keyof typeof VARIANTS;
  tooltip?: string;
}

export function IconButton({ onClick, tooltip, variant }: Props) {
  const button = (
    <MuiIconButton edge='end' aria-label='delete' onClick={onClick}>
      {VARIANTS[variant]}
    </MuiIconButton>
  );

  if (tooltip) return <Tooltip message={tooltip}>{button}</Tooltip>;

  return button;
}
