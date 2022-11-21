import { failure, PromisedResult, Result, success } from '..';
import { ControllerRequest } from '../../models';
import { initSeed } from '../../seed';
import { makeMatch } from '../../tools';

export const AuthController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    connect: async ({ query, context }) => {
      if (context.state.get('isConnectedToDb')) return success('OK');

      await context.db.connect(query.payload);
      context.state.set('isConnectedToDb', true);

      const result = await context.collections.scenario.find({});

      if (!result.length) await initSeed();

      return success('OK');
    },
    disconnect: async ({ context }) => {
      await context.db.disconnect();
      context.state.set('isConnectedToDb', false);
      return success('OK');
    },
  },
  () => failure('Auth controller action is not found', 400),
);
