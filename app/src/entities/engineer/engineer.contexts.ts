import { as, R } from '@mv-d/toolbelt';
import { createContext } from 'use-context-selector';

import { DbEngineer } from '../../shared/models/db.models';

export interface EngineerContextType {
  engineer: DbEngineer;
}

export const EngineerContext = R.compose(createContext<EngineerContextType>, as<EngineerContextType>)({});

EngineerContext.displayName = 'EngineerContext';
