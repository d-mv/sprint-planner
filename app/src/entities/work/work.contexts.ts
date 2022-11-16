import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { DbWorkToRender, MongoDocument } from '../../shared';
import { as } from '../../shared';
import { Work } from './work.models';

export interface WorkContextType {
  work: MongoDocument<Work>;
  assigned?: Omit<DbWorkToRender, 'work'>;
}

export const WorkContext = compose(createContext<WorkContextType>, as<WorkContextType>)({});

WorkContext.displayName = 'WorkContext';
