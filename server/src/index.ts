import { config } from 'dotenv';

import { connectDb } from './adaptors';

import { server } from './server';

config();

const MONGODB_URL = process.env['MONGODB_UR'];

if (MONGODB_URL) connectDb(MONGODB_URL);

server(8888);
