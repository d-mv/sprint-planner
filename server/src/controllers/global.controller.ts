import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
} from '@mv-d/toolbelt';

import { ControllerRequest } from '../models';
import { syntheticSeed, initSeed } from '../seed';

// eslint-disable-next-line prettier/prettier
export const GlobalController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    seed: async () => {
      await syntheticSeed();

      return positiveResponse('OK');
    },
    init: async () => {
      await initSeed();

      return positiveResponse('OK');
    },
  },
  () => negativeResponse('Global controller action is not found', 400),
);
