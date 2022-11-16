import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { query } from '../../shared';
import { getMessage } from '../../state';
import { as } from '../../shared';

export interface AppContextType {
  query: typeof query;
  getMessage: typeof getMessage;
}

export const AppContext = compose(createContext<AppContextType>, as<AppContextType>)({});

AppContext.displayName = 'AppContext';
