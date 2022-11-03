import { log } from 'console';
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
import { path } from 'ramda';
import mongoose from 'mongoose';

// import { AnyValue, RecordObject, User, UserSchema } from './types';

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
  // server.post<{ Body: User }>(
  //   '/auth',
  //   {
  // schema: {
  //   body: UserSchema,
  //   // response to the request
  //   response: {
  //     200: {
  //       type: 'object',
  //       properties: {
  //         name: { type: 'string' },
  //         requestId: { type: 'string' },
  //       },
  //     },
  //   },
  // },
  // onRequest: (request, _reply, done) => {
  //   log('>>> onRequest');
  //   request.id = randomUUID();
  //   performance.mark(`${request.id}-start`);
  //   done();
  // },
  // onResponse: (request, _reply, done) => {
  //   const measure = performance.measure(request.id, `${request.id}-start`);

  //   log('>>> onResponse, request performance:');
  //   dir(measure);
  //   done();
  // },
  // preValidation: (request, _reply, done) => {
  //   log(`>>> preValidation for ${request.id}`);
  //   done();
  // },
  // preHandler: (request, _reply, done) => {
  //   log(`>>> perHandler for ${request.id}`);
  //   done();
  // },
  //   },
  //   (request, reply) => {
  //     log('>>> handler');

  //     const { firstName, lastName } = request.body;

  //     reply
  //       .status(200)
  //       .send({ requestId: request.id, name: `${lastName}, ${firstName}` });
  //   }
  // );
  next();
}
