import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
} from '@mv-d/toolbelt';

import { ControllerRequest } from '../../models';
import { incomingSprintToDbFormat } from './sprint.tools';

// eslint-disable-next-line prettier/prettier
export const SprintController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.sprint.create(incomingSprintToDbFormat(query.payload));

      return positiveResponse(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.sprint.deleteOne(query.payload);

      if (result.deletedCount) return positiveResponse('OK');

      return negativeResponse('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return negativeResponse('Missing data', 400);

      const result = await context.collections.sprint.updateOne(query.payload);

      if (result.modifiedCount) return positiveResponse('OK');

      return negativeResponse('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.sprint.find({});

      return positiveResponse(result);
    },
  },
  () => negativeResponse('Sprint controller action is not found', 400),
);
