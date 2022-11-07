import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { MongoDocument } from '../../models';
import { as } from '../../tools';
import { Work } from './work.models';

export interface WorkContextType {
  work: MongoDocument<Work>;
}

export const WorkContext = compose(createContext<WorkContextType>, as<WorkContextType>)({});

WorkContext.displayName = 'WorkContext';
