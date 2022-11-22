import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import compress from '@fastify/compress';
import caching from '@fastify/caching';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import { generateId, logger } from '@mv-d/toolbelt';

import { apiRouter, generalRouter } from './routers';
import { CONFIG } from './config';
import { getter } from './tools';

const isTest = process.env['NODE_ENV'] === 'test';

export const app = fastify({
  logger: {
    level: isTest ? 'fatal' : 'trace',
    transport: { target: 'pino-pretty', options: { colorize: CONFIG.isDev } },
    serializers: {
      req: req => ({
        method: req.method,
        url: req.url,
        controller: getter(req.headers),
        version: CONFIG.version,
        hostname: req.hostname,
      }),
      error: err => ({
        type: err.type,
        message: err.message,
        stack: err.stack,
      }),
    },
  },
  genReqId: req => (req.id = generateId()),
}).withTypeProvider<JsonSchemaToTsProvider>();

export async function server(port: number) {
  // plugins
  // global - default
  app.register(compress, { global: true });
  app.register(caching, { privacy: caching.privacy.NOCACHE });
  app.register(cors);
  app.register(helmet);
  // routes

  app.register(apiRouter, { prefix: 'api/v1' });
  app.register(generalRouter, { prefix: '/' });
  app.register(fastifyStatic, { root: '/Users/dmelnikov/code/sprint-planning/app/build', list: false });

  // start
  try {
    await app.listen({ port });
  } catch (err) {
    logger.error('!> Server caught an error:');
    logger.dir(err);
  }

  return app;
}
