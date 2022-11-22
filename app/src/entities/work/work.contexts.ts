import { as, R } from '@mv-d/toolbelt';
import { createContext } from 'use-context-selector';

import { DbWorkToRender, DbWork } from '../../shared';

export interface WorkContextType {
  work: DbWork;
  assigned?: Omit<DbWorkToRender, 'work'>;
}

export const WorkContext = R.compose(createContext<WorkContextType>, as<WorkContextType>)({});

WorkContext.displayName = 'WorkContext';
