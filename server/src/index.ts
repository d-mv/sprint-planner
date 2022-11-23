import { logger } from '@mv-d/toolbelt';
import { config } from 'dotenv';

import { connectDb } from './adaptors';
import { CONFIG } from './config';

import { server } from './server';

config();

if (CONFIG.isDev) logger.dir(CONFIG);

if (CONFIG.db) connectDb(CONFIG.db);

server(CONFIG.port);
