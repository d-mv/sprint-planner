import { failure, PromisedResult, Result, success } from '../entities';
import { ControllerRequest } from '../models';
import { seed } from '../seed';
import { makeMatch } from '../tools';

export const GlobalController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    seed: async () => {
      await seed();

      return success('OK');
    },
  },
  () => failure('GlobalController action is not found', 400),
);
