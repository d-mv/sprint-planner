import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const AppController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    assignEngineer: async ({ query, context }) => {
      const app = await context.collections.app.findOne({});

      if (app) {
        const assignedEngineers = [...app.assignedEngineers, query.payload];

        await app.updateOne({ assignedEngineers });
        return success([assignedEngineers]);
      }

      await context.collections.app.create({ assignedEngineers: [query.payload] });
      return success([query.payload]);
    },
    removeEngineer: async ({ query, context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (!app) return success('OK');

      const assignedEngineers = app.assignedEngineers.filter(engineer => engineer !== query.payload);

      await app.updateOne({ assignedEngineers });
      return success('OK');
    },
    getAssignedEngineers: async ({ context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (app) return success(app.assignedEngineers);

      return success([]);
    },
  },
  () => failure('Engineer controller action is not found', 400),
);
