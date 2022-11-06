import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const AppController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    addEngineer: async ({ query, context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (app) {
        const addedEngineers = [...app.addedEngineers, query.payload];

        await app.updateOne({ addedEngineers });
        return success([addedEngineers]);
      }

      await context.collections.app.create({ addedEngineers: [query.payload] });
      return success([query.payload]);
    },
    removeEngineer: async ({ query, context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (!app) return success('OK');

      const addedEngineers = app.addedEngineers.filter(engineer => engineer !== query.payload);

      await app.updateOne({ addedEngineers });
      return success('OK');
    },
    getAddedEngineers: async ({ context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (app) return success(app.addedEngineers);

      return success([]);
    },
  },
  () => failure('EngineerController action is not found', 400),
);
