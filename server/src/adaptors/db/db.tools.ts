import { connect } from 'mongoose';
import { path } from 'ramda';

import { STATE } from '../../entities';

export async function connectDb(url: string) {
  try {
    await connect(url);

    STATE.isConnectedToDb = true;
  } catch (err) {
    throw new Error(path(['message'], err) ?? 'Unknown error when connecting to DB');
  }
}
