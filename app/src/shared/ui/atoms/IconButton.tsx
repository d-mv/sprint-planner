import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton as MuiIconButton, SvgIconProps } from '@mui/material';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SettingsSystemDaydreamRoundedIcon from '@mui/icons-material/SettingsSystemDaydreamRounded';
import { makeMatch } from '../../tools';

import { Tooltip } from './Tooltip';

const VARIANTS = makeMatch(
  {
    delete: DeleteIcon,
    edit: EditIcon,
    assignWork: WorkHistoryRoundedIcon,
    createWork: WorkRoundedIcon,
    dayOff: SettingsSystemDaydreamRoundedIcon,
  },
  () => <div id='no-icon-found' />,
);

interface Props {
  onClick: () => void;
  variant: keyof typeof VARIANTS;
  tooltip?: string;
  disabled?: boolean;
  iconProps?: Partial<SvgIconProps>;
}

export function IconButton({ onClick, tooltip, variant, disabled, iconProps }: Props) {
  const Icon = VARIANTS[variant];

  const button = (
    <MuiIconButton edge='end' aria-label='delete' disabled={disabled} onClick={onClick}>
      <Icon {...iconProps} />
    </MuiIconButton>
  );

  if (tooltip) return <Tooltip message={tooltip}>{button}</Tooltip>;

  return button;
}
