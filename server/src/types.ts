import { FromSchema } from 'json-schema-to-ts';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export const UserSchema = {
  $id: 'schema-user',
  type: 'object',
  required: ['firstName', 'lastName'],
  additionalProperties: false,
  properties: {
    firstName: { type: 'string', minLength: 1 },
    lastName: { type: 'string', minLength: 1 },
    status: { type: 'string' },
  },
} as const;

export type User = FromSchema<typeof UserSchema>;

export type FastifyServer = FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse,
  FastifyBaseLogger,
  JsonSchemaToTsProvider
>;
