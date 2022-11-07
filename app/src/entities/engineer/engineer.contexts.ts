import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { MongoDocument } from '../../models';
import { as } from '../../tools';
import { Engineer } from './engineer.models';

export interface EngineerContextType {
  engineer: MongoDocument<Engineer>;
}

export const EngineerContext = compose(createContext<EngineerContextType>, as<EngineerContextType>)({});

EngineerContext.displayName = 'EngineerContext';
