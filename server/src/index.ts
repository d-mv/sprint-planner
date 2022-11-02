import { config } from 'dotenv';
import { connectDb } from './db';

import { server } from './server';

config();

const MONGODB_URL = process.env['MONGODB_URL'];

if (MONGODB_URL) connectDb(MONGODB_URL);

server(8888);
