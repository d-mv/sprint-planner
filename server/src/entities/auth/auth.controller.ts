// import { disconnect } from 'mongoose';

// import { connectDb } from '../db';
import { failure, PromisedResult, Result, success } from '..';
import { ControllerRequest } from '../../models';
// import { Query } from '../models';
// import { STATE } from '../../state';
import { makeMatch } from '../../tools';

export const AuthController = makeMatch<(arg: ControllerRequest) => PromisedResult | Result>(
  {
    connect: async ({ query, context }) => {
      if (context.state.get('isConnectedToDb')) return success('OK');

      await context.db.connect(query.payload);
      context.state.set('isConnectedToDb', true);

      return success('OK');
    },
    disconnect: async ({ context }) => {
      await context.db.disconnect();
      context.state.set('isConnectedToDb', false);
      // eslint-disable-next-line no-console
      console.log(context.state.get('isConnectedToDb'));

      return success('OK');
    },
  },
  () => failure('AuthController action is not found', 400),
);
