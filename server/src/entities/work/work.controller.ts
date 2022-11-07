import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';

export const WorkController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      if (!query.payload) return failure('Nothing to create', 400);

      if ('assign' in query.payload && 'engineerId' in query.payload.assign && 'startDate' in query.payload.assign) {
        const { work, assign } = query.payload;

        if (!work) return failure('Nothing to create', 400);

        const result = await context.collections.work.create(work);

        const assignResult = await context.collections.assignedWork.create({
          workId: result._id.toString(),
          engineerId: assign.engineerId,
          startDate: assign.startDate,
        });

        return success({ work: result, assignedWork: assignResult });
      } else {
        const result = await context.collections.work.create(query.payload);

        return success(result);
      }
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.work.deleteOne(query.payload);

      if (result.deletedCount) return success('OK');

      return failure('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return failure('Missing data', 400);

      const result = await context.collections.work.updateOne(query.payload);

      if (result.modifiedCount) return success('OK');

      return failure('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.work.find({});

      return success(result);
    },
  },
  () => failure('WorkController action is not found', 400),
);
