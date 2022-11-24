import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
} from '@mv-d/toolbelt';

import { Work } from '..';
import { ControllerRequest } from '../../models';

// eslint-disable-next-line prettier/prettier
export const WorkController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    add: async ({ query, context }) => {
      if (!query.payload) return negativeResponse('Nothing to create', 400);

      if ('assign' in query.payload && 'engineerId' in query.payload.assign && 'startDate' in query.payload.assign) {
        const { work, assign } = query.payload;

        if (!work) return negativeResponse('Nothing to create', 400);

        const result = await context.collections.work.create(work);

        const assignResult = await context.collections.assignedWork.create({
          workId: result._id.toString(),
          engineerId: assign.engineerId,
          startDate: assign.startDate,
        });

        return positiveResponse({ work: result, assignedWork: assignResult });
      } else {
        const result = await context.collections.work.create(query.payload);

        return positiveResponse(result);
      }
    },
    delete: async ({ query, context }) => {
      const result = await context.collections.work.deleteOne(query.payload);

      if (result.deletedCount) return positiveResponse('OK');

      return negativeResponse('Failed to delete item', 500);
    },
    update: async ({ query, context }) => {
      const item = query.payload;

      if (!item) return negativeResponse('Missing data', 400);

      const assignedItemToUpdate = await context.collections.assignedWork.findOne({ _id: item._id });

      let assignedUpdateResult = -1;

      const { startDate, _id, estimate, jiraEpic, jiraTicket, title } = item;

      if (startDate) {
        const result = await context.collections.assignedWork.updateOne({ _id }, { startDate });

        if (result.modifiedCount) assignedUpdateResult = 1;
        else assignedUpdateResult = 0;
      }

      const updateData: Partial<Work> = {};

      if (estimate) updateData.estimate = estimate;

      if (jiraEpic) updateData.jiraEpic = jiraEpic;

      if (jiraTicket) updateData.jiraTicket = jiraTicket;

      if (title) updateData.title = title;

      const result = await context.collections.work.updateOne({ _id: assignedItemToUpdate?.workId }, updateData);

      if (assignedUpdateResult && result.modifiedCount) {
        const work = await context.collections.work.findOne({ _id: assignedItemToUpdate?.workId });

        const assignedWork = await context.collections.assignedWork.findOne({ _id });

        return positiveResponse({ work, assignedWork });
      }

      return negativeResponse('Failed to update record', 500);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.work.find({});

      return positiveResponse(result);
    },
  },
  () => negativeResponse('Work controller action is not found', 400),
);
