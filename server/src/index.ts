import { config } from 'dotenv';

import { connectDb } from './adaptors';
import { CONFIG } from './config';

import { server } from './server';

config();

if (CONFIG.db) connectDb(CONFIG.db);

server(CONFIG.port);
