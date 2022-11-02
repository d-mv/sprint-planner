import { FastifyInstance } from 'fastify';

export function generalRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.get('/ping', () => 'pong');
  server.get('/error', () => {
    throw new Error('Sample Error');
  });
  next();
}
