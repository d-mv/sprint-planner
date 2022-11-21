import { Divider, Drawer, ListItemIcon, ListItemText, MenuItem, MenuList } from '@mui/material';

import { MENU_ITEMS, mapWithIndex, MenuItemType, MenuItemIds } from '../../shared';
import { ifTrue } from '../../shared/tools/logic.tools';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAction: (arg0: MenuItemIds) => void;
}

export function Menu({ isOpen, onClose, onAction }: Props) {
  function handleAction(id: MenuItemIds) {
    return function call() {
      onAction(id);
    };
  }

  function renderMenuItem({ id, label, Icon }: MenuItemType, index: number) {
    return (
      <span key={id}>
        {ifTrue(index === MENU_ITEMS.length - 1, <Divider />)}
        <MenuItem onClick={handleAction(id)}>
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
