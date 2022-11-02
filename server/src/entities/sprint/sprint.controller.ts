import { failure, success, Result, PromisedResult } from '..';
import { ControllerRequest } from '../../models';
import { makeMatch } from '../../tools';
import { Sprint, SprintRequest } from './sprint.models';

function incomingSprintToDbFormat(data: SprintRequest): Sprint {
  return {
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    daysOff: data.daysOff.map(day => new Date(day)),
  };
}

export const SprintController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    add: async ({ query, context }) => {
      const r = await context.collections.sprint.create(incomingSprintToDbFormat(query.payload));

      return success(r);
    },
    getAll: async ({ context }) => {
      const result = await context.collections.sprint.find({});

      return success(result);
    },
  },
  () => failure('AuthController action is not found', 400),
);
