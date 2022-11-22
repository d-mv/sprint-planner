import { logger, getMessageFromError, success } from '@mv-d/toolbelt';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

import { Query } from '../models';
import { QueryController } from '../controllers';
import {
  request,
  SprintCollection,
  EngineerCollection,
  WorkCollection,
  AssignedWorkCollection,
  AppCollection,
  ScenarioCollection,
} from '../entities';
import { clearTimeout } from 'timers';
import { CONFIG } from '../config';
import { checkQuery } from '../tools';

let errorMessage = '';

let timeout: NodeJS.Timeout | undefined = undefined;

let cachedIdleTime = CONFIG.idleTime;

function disconnectFromDb(idleTime: number) {
  return function call() {
    logger.info(`Idle time ${idleTime / 1000}s is out, disconnecting...`);

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
  server.post<{ Body: Query }>('/query', async ({ body, id }, res) => {
    const { isConnectRequest, isDisConnectRequest, isIdleTimeUpdateRequest } = checkQuery(body);

    const dbDisconnected = mongoose.connection.readyState === 0;

    // if db is disconnected and it's a non-connect request - we can't proceed
    if (dbDisconnected && !isConnectRequest) {
      logger.error('System is disconnected');
      return res.code(401).send(errorMessage ?? 'System is not connected to DB');
    }

    // if this is non-disconnect or connect request, we need to restart timeout
    if (!isConnectRequest && !isDisConnectRequest) {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(disconnectFromDb(cachedIdleTime), cachedIdleTime);
    }

    try {
      const result = await request(QueryController, {
        query: body,
        context: {
          requestId: id,
          db: mongoose,
          collections: {
            sprint: SprintCollection,
            engineer: EngineerCollection,
            work: WorkCollection,
            assignedWork: AssignedWorkCollection,
            app: AppCollection,
            scenario: ScenarioCollection,
          },
        },
      });

      if (isIdleTimeUpdateRequest && result.isOK)
        cachedIdleTime = typeof body.payload === 'string' ? parseInt(body.payload) * 1000 : body.payload * 1000;

      // if connected - timeout needs to start
      if (isConnectRequest && result.isOK) {
        cachedIdleTime = result.payload.idleTimeMS;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(disconnectFromDb(cachedIdleTime), cachedIdleTime);
      }

      // if disconnected - timeout is also not needed
      if (isDisConnectRequest && result.isOK && timeout) {
        logger.error('Successfully disconnected > clearing timeout');
        clearTimeout(timeout);
      }

      if (result.isOK) return success(result.payload);

      return res.code(result.code).send(result.message);
    } catch (err) {
      return res.code(500).send(getMessageFromError(err) ?? 'Unknown controller error');
    }
  });

  next();
}
