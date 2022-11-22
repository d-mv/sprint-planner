import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
} from '@mv-d/toolbelt';

import { ControllerRequest } from '../../models';

// eslint-disable-next-line prettier/prettier
export const AppController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    assignEngineer: async ({ query, context }) => {
      const app = await context.collections.app.findOne({});

      if (app) {
        const assignedEngineers = [...app.assignedEngineers, query.payload];

        await app.updateOne({ assignedEngineers });
        return positiveResponse([assignedEngineers]);
      }

      await context.collections.app.create({ assignedEngineers: [query.payload] });
      return positiveResponse([query.payload]);
    },
    removeEngineer: async ({ query, context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (!app) return positiveResponse('OK');

      const assignedEngineers = app.assignedEngineers.filter(engineer => engineer !== query.payload);

      await app.updateOne({ assignedEngineers });
      return positiveResponse('OK');
    },
    getAssignedEngineers: async ({ context }) => {
      const app = (await context.collections.app.find({}))[0];

      if (app) return positiveResponse(app.assignedEngineers);

      return positiveResponse([]);
    },
    updateIdleTime: async ({ query, context }) => {
      const int = parseInt(query.payload);

      if (!Number.isInteger(int)) return negativeResponse('Incorrect value, should be an integer', 400);

      const app = (await context.collections.app.find({}))[0];

      if (app) {
        const result = await context.collections.app.updateOne({ _id: app._id, idleTimeS: int });

        if (result.modifiedCount === 1) return positiveResponse('OK');

        return negativeResponse('Unable to update', 500);
      }

      return negativeResponse('Unable to update. DB is not initialized?', 500);
    },
  },
  () => negativeResponse('Engineer controller action is not found', 400),
);
