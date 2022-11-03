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
} from '../entities';

export function apiRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.post<{ Body: Query }>('/query', async ({ body }) => {
    const requestId = randomUUID();

    log(colors.blue(`>> #${requestId} ${body.domain}/${body.action}`));
    performance.mark(`${requestId}-start`);

    let isPositive = true;

    try {
      return await request(QueryController, {
        query: body,
        context: {
          requestId,
          db: mongoose,
          collections: {
            sprint: SprintCollection,
            engineer: EngineerCollection,
            work: WorkCollection,
            assignedWork: AssignedWorkCollection,
          },
          state: { set, get },
        },
      });
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
