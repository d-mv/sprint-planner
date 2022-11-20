import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';
import { incomingSprintToDbFormat } from './sprint.tools';

export const SprintController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      // eslint-disable-next-line no-console
      console.dir(query.payload, { depth: 15 });

      const result = await context.collections.sprint.create(incomingSprintToDbFormat(query.payload));

      return success(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.sprint.deleteOne(query.payload);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return failure('Missing data', 400);

      const result = await context.collections.sprint.updateOne(query.payload);

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.sprint.find({});

      return success(result);
    },
  },
  () => failure('Sprint controller action is not found', 400),
);
