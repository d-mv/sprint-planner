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
export const ScenarioController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.scenario.create(query.payload);

      return positiveResponse(result);
    },
    update: async ({ query, context }) => {
      if (!query.payload) return negativeResponse('Missing data', 400);

      const result = await context.collections.scenario.updateOne(query.payload);

      if (result.modifiedCount) return positiveResponse('OK');

      return negativeResponse('Failed to update record', 500);
    },
    delete: async ({ query, context }) => {
      if (!query.payload) return negativeResponse('Missing data', 400);

      const result = await context.collections.scenario.deleteOne(query.payload);

      if (result.deletedCount) return positiveResponse('OK');

      return negativeResponse('Failed to delete item', 500);
    },
    getAll: async ({ context }) => {
      const scenarios = await context.collections.scenario.find({});

      return positiveResponse(scenarios);
    },
  },
  () => negativeResponse('Scenario controller action is not found', 400),
);
