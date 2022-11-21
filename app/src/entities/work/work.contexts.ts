import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { DbWorkToRender, DbWork } from '../../shared';
import { as } from '../../shared/tools/type.tools';

export interface WorkContextType {
  work: DbWork;
  assigned?: Omit<DbWorkToRender, 'work'>;
}

export const WorkContext = compose(createContext<WorkContextType>, as<WorkContextType>)({});

WorkContext.displayName = 'WorkContext';
