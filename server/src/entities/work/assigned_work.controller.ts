import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const AssignedWorkController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.assignedWork.create(query.payload);

      return success(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.assignedWork.deleteOne({ _id: query.payload });

      // eslint-disable-next-line no-console
      console.log(result, query);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return failure('Missing data', 400);

      const result = await context.collections.assignedWork.updateOne(query.payload);

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.assignedWork.find({});

      return success(result);
    },
  },
  () => failure('AssignedWorkController action is not found', 400),
);
