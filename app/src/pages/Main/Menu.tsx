import { Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { AnyValue, ifTrue, mapWithIndex } from '../../shared';

interface MenuItemType {
  label: string;
  Icon: OverridableComponent<AnyValue>;
}

const MENU_ITEMS: MenuItemType[] = [
  { label: 'Add Sprint', Icon: UpdateRoundedIcon },
  { label: 'Create Engineer', Icon: PersonAddAltRoundedIcon },
  { label: 'Add Engineer', Icon: GroupAddRoundedIcon },
  { label: 'Logout', Icon: MeetingRoomRoundedIcon },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAction: (arg0: string) => () => void;
}

export function Menu({ isOpen, onClose, onAction }: Props) {
  function renderMenuItem({ label, Icon }: MenuItemType, index: number) {
    return (
      <span>
        {ifTrue(index === MENU_ITEMS.length - 1, <Divider />)}
        <MenuItem onClick={onAction(label)}>
          <ListItemIcon>
            <Icon fontSize='large' />
          </ListItemIcon>
          <ListItemText>{label}</ListItemText>
        </MenuItem>
      </span>
    );
  }

  return (
    <Drawer anchor='left' open={isOpen} onClose={onClose}>
      <div style={{ paddingTop: '7rem', width: '20rem' }}>
        <MenuList>{mapWithIndex(renderMenuItem, MENU_ITEMS)}</MenuList>
      </div>
    </Drawer>
  );
}
