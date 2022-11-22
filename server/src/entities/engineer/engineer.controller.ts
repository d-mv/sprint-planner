import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  R,
  ServerResult,
} from '@mv-d/toolbelt';

import { ControllerRequest } from '../../models';
import { sortDaysOff } from '../../tools';

// eslint-disable-next-line prettier/prettier
export const EngineerController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    add: async ({ query, context }) => {
      const result = await context.collections.engineer.create(query.payload);

      return R.compose(positiveResponse, sortDaysOff)(result);
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.engineer.deleteOne(query.payload);

      if (result.deletedCount) return positiveResponse('OK');

      return negativeResponse('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return negativeResponse('Missing data', 400);

      const { _id, daysOff } = item;

      const result = await context.collections.engineer.updateOne({ _id }, { daysOff });

      if (result.modifiedCount) {
        const engineer = await context.collections.engineer.findOne({ _id });

        return positiveResponse(engineer);
      }

      return negativeResponse('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.engineer.find({});

      return R.compose(positiveResponse, R.map(sortDaysOff))(result);
    },
  },
  () => negativeResponse('Engineer controller action is not found', 400),
);
