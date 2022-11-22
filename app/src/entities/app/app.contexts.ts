import { createContext } from 'use-context-selector';
import { as, R, AnyValue, Result } from '@mv-d/toolbelt';

import { getMessage } from '../../state';

export interface AppContextType {
  query: <T = AnyValue>(domain: string, action: string, payload?: AnyValue) => Promise<Result<T>>;
  getMessage: typeof getMessage;
}

export const AppContext = R.compose(createContext<AppContextType>, as<AppContextType>)({});

AppContext.displayName = 'AppContext';
