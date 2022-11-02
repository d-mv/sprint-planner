import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import compress from '@fastify/compress';
import caching from '@fastify/caching';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { apiRouter, generalRouter } from './routers';

const { log, dir } = console;

const isTest = process.env['NODE_ENV'] === 'test';

export const app = fastify({
  logger: {
    level: isTest ? 'fatal' : 'trace', //  "fatal" | "error" | "warn" | "info" | "debug" | "trace";
    // serializers?: { [key: string]: SerializerFn };
    // customLevels?: { [key: string]: number };
    // formatters?: {
    //     level?: (label: string, number: number) => object;
    //     bindings?: (bindings: Bindings) => object;
    //     log?: (object: object) => object;
    // };
    // redact?: string[] | redactOptions; // { paths: string[], censor?: string |((value: any, path: string[]) => any),  remove?: boolean }
  },
  // defaults
  // ajv: {
  //   customOptions: {
  //     removeAdditional: true,
  //     useDefaults: true,
  //     coerceTypes: true,
  // nullable: true,
  // },
  // },
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

  // start
  try {
    await app.listen({ port });
  } catch (err) {
    log('!> Server caught an error:');
    dir(err);
  }

  return app;
}
