import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const EngineerController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.engineer.create(query.payload);

      return success(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.engineer.deleteOne(query.payload);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return failure('Missing data', 400);

      const result = await context.collections.engineer.updateOne(query.payload);

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.engineer.find({});

      return success(result);
    },
  },
  () => failure('EngineerController action is not found', 400),
);
