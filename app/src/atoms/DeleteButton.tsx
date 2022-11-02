import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import { Tooltip } from './Tooltip';

interface Props {
  onClick: () => void;
  tooltip?: string;
}
export function DeleteButton({ onClick, tooltip }: Props) {
  const button = (
    <IconButton edge='end' aria-label='delete' onClick={onClick}>
      <DeleteIcon />
    </IconButton>
  );

	if (tooltip) return <Tooltip message={tooltip}>{button}</Tooltip>;

  return button;
}
