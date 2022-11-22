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
    updateIdleTime: async ({ query, context }) => {
      const int = parseInt(query.payload);

      if (!Number.isInteger(int)) return failure('Incorrect value, should be an integer');

      const app = (await context.collections.app.find({}))[0];

      if (app) {
        const result = await context.collections.app.updateOne({ _id: app._id, idleTimeS: int });

        if (result.modifiedCount === 1) return success('OK');

        return failure('Unable to update');
      }

      return failure('Unable to update. DB is not initialized?');
    },
  },
  () => failure('Engineer controller action is not found', 400),
);
