import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { DbEngineer } from '../../shared/models/db.models';
import { as } from '../../shared/tools/type.tools';

export interface EngineerContextType {
  engineer: DbEngineer;
}

export const EngineerContext = compose(createContext<EngineerContextType>, as<EngineerContextType>)({});

EngineerContext.displayName = 'EngineerContext';
