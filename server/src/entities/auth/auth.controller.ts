import {
  AnyValue,
  makeMatch,
  negativeResponse,
  positiveResponse,
  PromisedServerResult,
  ServerResult,
  logger,
} from '@mv-d/toolbelt';
import { CONFIG } from '../../config';
import { ControllerRequest } from '../../models';
import { initSeed } from '../../seed';

// eslint-disable-next-line prettier/prettier
export const AuthController = makeMatch<(arg: ControllerRequest) => PromisedServerResult<AnyValue> | ServerResult<AnyValue>
>(
  {
    connect: async ({ query, context }) => {
      const getIdleTime = async () => {
        const app = await context.collections.app.findOne();

        if (app) {
          logger.infoB(`Idle time is found - ${app.idleTimeS}s`);
          return positiveResponse({ idleTimeMS: app.idleTimeS * 1000 });
        }

        logger.warn(`Idle time is not found, using default one - ${CONFIG.idleTime}s`);
        return positiveResponse({ idleTimeMS: CONFIG.idleTime * 1000 });
      };

      if (context.db.connection.readyState !== 0) return await getIdleTime();

      await context.db.connect(query.payload);

      const result = await context.collections.scenario.find({});

      if (!result.length) await initSeed();

      return await getIdleTime();
    },
    disconnect: async ({ context }) => {
      await context.db.disconnect();
      return positiveResponse('OK');
    },
  },
  () => negativeResponse('Auth controller action is not found', 400),
);
