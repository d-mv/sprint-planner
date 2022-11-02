// import { dir, log } from 'console';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
// import { performance } from 'perf_hooks';
import { Query } from '../models';
import { QueryController } from '../controllers';
import { failure, request, SprintCollection, set, get } from '../entities';
import { path } from 'ramda';
import mongoose from 'mongoose';

// import { AnyValue, RecordObject, User, UserSchema } from './types';

export function apiRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.post<{ Body: Query }>('/query', async ({ body }) => {
    try {
      return await request(QueryController, {
        query: body,
        context: {
          requestId: randomUUID(),
          db: mongoose,
          collections: { sprint: SprintCollection },
          state: { set, get },
        },
      });
    } catch (err) {
      return failure(path(['message'], err) ?? 'Unknown controller error', 500);
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
