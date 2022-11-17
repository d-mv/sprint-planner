import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { query, as } from '../../shared';
import { getMessage } from '../../state';

export interface AppContextType {
  query: typeof query;
  getMessage: typeof getMessage;
}

export const AppContext = compose(createContext<AppContextType>, as<AppContextType>)({});

AppContext.displayName = 'AppContext';
