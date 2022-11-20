import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import UpdateRoundedIcon from '@mui/icons-material/UpdateRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { AnyValue } from '../models';

export enum MenuItemIds {
  ADD_SPRINT = 'addSprint',
  CREATE_ENGINEER = 'createEngineer',
  ADD_ENGINEER = 'addEngineer',
  LOGOUT = 'logout',
}

export interface MenuItemType {
  id: MenuItemIds;
  label: string;
  Icon: OverridableComponent<AnyValue>;
}

export const MENU_ITEMS: MenuItemType[] = [
  { id: MenuItemIds.ADD_SPRINT, label: 'Add Sprint', Icon: UpdateRoundedIcon },
  { id: MenuItemIds.CREATE_ENGINEER, label: 'Create Engineer', Icon: PersonAddAltRoundedIcon },
  { id: MenuItemIds.ADD_ENGINEER, label: 'Add Engineer', Icon: GroupAddRoundedIcon },
  { id: MenuItemIds.LOGOUT, label: 'Logout', Icon: MeetingRoomRoundedIcon },
];
