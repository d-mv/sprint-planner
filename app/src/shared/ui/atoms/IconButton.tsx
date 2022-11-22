import { makeMatch } from '@mv-d/toolbelt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton as MuiIconButton, SvgIconProps, SxProps } from '@mui/material';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import SettingsSystemDaydreamRoundedIcon from '@mui/icons-material/SettingsSystemDaydreamRounded';
import MenuIcon from '@mui/icons-material/Menu';

import { Tooltip } from './Tooltip';

const VARIANTS = makeMatch(
  {
    delete: DeleteIcon,
    edit: EditIcon,
    assignWork: WorkHistoryRoundedIcon,
    createWork: WorkRoundedIcon,
    dayOff: SettingsSystemDaydreamRoundedIcon,
    menu: MenuIcon,
  },
  () => <div id='no-icon-found' />,
);

interface Props {
  onClick: () => void;
  variant: keyof typeof VARIANTS;
  tooltip?: string;
  disabled?: boolean;
  iconProps?: Partial<SvgIconProps>;
  color?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  size?: 'small' | 'medium' | 'large';
  sx?: SxProps;
}

export function IconButton({ onClick, color, tooltip, variant, disabled, iconProps, size, sx }: Props) {
  const Icon = VARIANTS[variant];

  const button = (
    <MuiIconButton
      edge='end'
      color={color}
      size={size ?? 'medium'}
      aria-label='delete'
      sx={sx}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon {...iconProps} />
    </MuiIconButton>
  );

  if (tooltip) return <Tooltip message={tooltip}>{button}</Tooltip>;

  return button;
}
