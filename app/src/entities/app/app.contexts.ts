import { compose } from 'ramda';
import { createContext } from 'use-context-selector';

import { AnyValue } from '../../shared';
import { as } from '../../shared/tools/type.tools';
import { getMessage } from '../../state';
import { Result } from '../result';

export interface AppContextType {
  query: <T = AnyValue>(domain: string, action: string, payload?: AnyValue) => Promise<Result<T>>;
  getMessage: typeof getMessage;
}

export const AppContext = compose(createContext<AppContextType>, as<AppContextType>)({});

AppContext.displayName = 'AppContext';
