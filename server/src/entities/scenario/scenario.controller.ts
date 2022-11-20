import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const ScenarioController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.scenario.create(query.payload);

      return success(result);
    },
    update: async ({ query, context }) => {
      if (!query.payload) return failure('Missing data');

      const result = await context.collections.scenario.updateOne(query.payload);

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    delete: async ({ query, context }) => {
      if (!query.payload) return failure('Missing data');

      const result = await context.collections.scenario.deleteOne(query.payload);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    getAll: async ({ context }) => {
      const scenarios = await context.collections.scenario.find({});

      return success(scenarios);
    },
  },
  () => failure('Scenario controller action is not found', 400),
);
