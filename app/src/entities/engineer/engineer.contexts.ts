import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { MongoDocument } from '../../shared';
import { as } from '../../shared';
import { Engineer } from './engineer.models';

export interface EngineerContextType {
  engineer: MongoDocument<Engineer>;
}

export const EngineerContext = compose(createContext<EngineerContextType>, as<EngineerContextType>)({});

EngineerContext.displayName = 'EngineerContext';
