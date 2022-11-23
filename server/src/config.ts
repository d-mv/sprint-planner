import { buildConfig, env } from '@mv-d/toolbelt';
import path from 'path';

export const CONFIG = {
  ...buildConfig(),
  idleTime: 600,
  address: env('SERVER_ADDRESS').value ?? 'localhost',
  db: env('MONGODB_URL').value,
  pathToBuild: path.join(__dirname, '../../app/build'),
};
