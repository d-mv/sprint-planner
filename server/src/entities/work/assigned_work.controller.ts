import {
  R,
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
} from '@mv-d/toolbelt';

import { ControllerRequest } from '../../models';

// eslint-disable-next-line prettier/prettier
export const AssignedWorkController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.assignedWork.create(query.payload);

      return positiveResponse(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.assignedWork.deleteOne({ _id: query.payload });

      if (result.deletedCount) return positiveResponse('OK');

      return negativeResponse('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return negativeResponse('Missing data', 400);

      const _id = R.path(['_id'], query.payload);

      const changes = R.omit(['_id'], query.payload);

      const result = await context.collections.assignedWork.updateOne({ _id }, changes);

      if (result.modifiedCount) return positiveResponse('OK');

      return negativeResponse('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.assignedWork.find({});

      return positiveResponse(result);
    },
  },
  () => negativeResponse('AssignedWork controller action is not found', 400),
);
