import { buildConfig, env } from '@mv-d/toolbelt';

export const CONFIG = { ...buildConfig(), idleTime: 600, db: env('MONGODB_URL').value };
