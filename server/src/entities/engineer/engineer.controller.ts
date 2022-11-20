import { compose, map } from 'ramda';
import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch, sortDaysOff } from '../../tools';

export const EngineerController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.engineer.create(query.payload);

      return compose(success, sortDaysOff)(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.engineer.deleteOne(query.payload);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return failure('Missing data', 400);

      const { _id, daysOff } = item;

      const result = await context.collections.engineer.updateOne({ _id }, { daysOff });

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.engineer.find({});

      return compose(success, map(sortDaysOff))(result);
    },
  },
  () => failure('Engineer controller action is not found', 400),
);
