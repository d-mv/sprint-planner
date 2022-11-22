import { log } from 'console';
import { path } from 'ramda';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { performance } from 'perf_hooks';
import colors from 'colors';

import { Query } from '../models';
import { QueryController } from '../controllers';
import {
  failure,
  request,
  SprintCollection,
  set,
  get,
  EngineerCollection,
  WorkCollection,
  AssignedWorkCollection,
  AppCollection,
  ScenarioCollection,
} from '../entities';
import { clearTimeout } from 'timers';
import { CONFIG } from '../config';

let errorMessage = '';

let timeout: NodeJS.Timeout | undefined = undefined;

let cachedIdleTime = CONFIG.idleTime;

function disconnectFromDb(idleTime: number) {
  return function call() {
    // eslint-disable-next-line no-console
    console.log(colors.blue(`Idle time ${idleTime / 1000}s is out, disconnecting...`));

    errorMessage = `System was disconnected after idle time of ${idleTime / 1000}s`;
    clearTimeout(timeout);
    mongoose.disconnect();
  };
}

export function apiRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.post<{ Body: Query }>('/query', async ({ body }, res) => {
    const requestId = randomUUID();

    log(colors.blue(`>> #${requestId} ${body.domain}/${body.action}`));
    performance.mark(`${requestId}-start`);

    const isConnectRequest = body.domain === 'auth' && body.action === 'connect';

    const isDisConnectRequest = body.domain === 'auth' && body.action === 'disconnect';

    const isIdleTimeUpdateRequest = body.domain === 'app' && body.action === 'updateIdleTimes';

    const dbDisconnected = mongoose.connection.readyState === 0;

    // if db is disconnected and it's a non-connect request - we can't proceed
    if (dbDisconnected && !isConnectRequest) {
      // eslint-disable-next-line no-console
      console.log(colors.red('System is disconnected'));
      return res.code(401).send(errorMessage ?? 'System is not connected to DB');
    }

    // if this is non-disconnect or connect request, we need to restart timeout
    if (!isConnectRequest && !isDisConnectRequest) {
      // eslint-disable-next-line no-console
      console.log(colors.blue('Regular request - restarting timeout'));

      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(disconnectFromDb(cachedIdleTime), cachedIdleTime);
    }

    let isPositive = true;

    try {
      const result = await request(QueryController, {
        query: body,
        context: {
          requestId,
          db: mongoose,
          collections: {
            sprint: SprintCollection,
            engineer: EngineerCollection,
            work: WorkCollection,
            assignedWork: AssignedWorkCollection,
            app: AppCollection,
            scenario: ScenarioCollection,
          },
          state: { set, get },
        },
      });

      if (isIdleTimeUpdateRequest && result.isOK)
        cachedIdleTime = typeof body.payload === 'string' ? parseInt(body.payload) * 1000 : body.payload * 1000;

      // if connected - timeout needs to start
      if (isConnectRequest && result.isOK) {
        // eslint-disable-next-line no-console
        console.log(colors.blue('Successfully connected'));
        // eslint-disable-next-line no-console
        console.log(colors.blue('Fetching idleTime...'));

        const app = await AppCollection.findOne({});

        if (app) {
          // eslint-disable-next-line no-console
          console.log(colors.blue(`Idle time is found - ${app.idleTimeS}s`));
          cachedIdleTime = app.idleTimeS * 1000;
        } else {
          // eslint-disable-next-line no-console
          console.log(colors.yellow(`Idle time is not found, using default one - ${cachedIdleTime / 1000}s`));
        }

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(disconnectFromDb(cachedIdleTime), cachedIdleTime);
      }

      // if disconnected - timeout is also not needed
      if (isDisConnectRequest && result.isOK && timeout) {
        // eslint-disable-next-line no-console
        console.log(colors.blue('Successfully disconnected > clearing timeout'));
        clearTimeout(timeout);
      }

      return result;
    } catch (err) {
      isPositive = false;
      return failure(path(['message'], err) ?? 'Unknown controller error', 500);
    } finally {
      const measure = performance.measure(requestId, `${requestId}-start`);

      const message = `<< #${requestId} ${isPositive ? 'OK' : 'ERROR'}, time: ${measure.duration}`;

      log(isPositive ? colors.green(message) : colors.red(message));
    }
  });

  next();
}
