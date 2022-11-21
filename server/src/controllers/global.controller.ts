import { failure, PromisedResult, Result, success } from '../entities';
import { ControllerRequest } from '../models';
import { syntheticSeed, initSeed } from '../seed';
import { makeMatch } from '../tools';

export const GlobalController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    seed: async () => {
      await syntheticSeed();

      return success('OK');
    },
    init: async () => {
      await initSeed();

      return success('OK');
    },
  },
  () => failure('GlobalController action is not found', 400),
);
